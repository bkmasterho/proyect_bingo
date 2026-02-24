<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompradorRequest;
use App\Http\Resources\CompradorCollection;
use App\Http\Resources\CompradorResource;
use App\Http\Resources\CompraResource;
use App\Models\Carton;
use App\Models\Comprador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CompradorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $compradores = Comprador::all();
        return new CompradorCollection($compradores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompradorRequest $request)
    {
        $data = $request->validated();
        $sorteoId = $data['sorteo_id']; // id del sorteo que viene del request

        DB::beginTransaction();

        try {

            // 1️⃣ Crear comprador si no existe por cedula o email
            $comprador = Comprador::firstOrCreate(
                ['cedula' => $data['cedula']], // condición de búsqueda
                [
                    'nombre' => $data['nombre'],
                    'apellido' => $data['apellido'] ?? 'Sin apellido',
                    'email' => $data['email'] ?? null,
                    'telefono' => $data['telefono'] ?? null,
                ]
            );

            // 2️⃣ Crear la compra asociada al sorteo
            $compra = $comprador->compras()->create([
                'sorteo_id' => $sorteoId,
                'img_compra' => $data['img_compra'] ?? null,
                'fecha' => now(),
            ]);


            //Saco los ID de cada carton para usarlos en la BD.
            $cartonIds = Carton::whereIn('numero_carton', $data['cartones'])
                ->pluck('id')
                ->toArray();

            $cartonesPivot = [];
            foreach ($cartonIds as $cartonId) {
                $cartonesPivot[$cartonId] = ['sorteo_id' => $sorteoId];
            }

            $compra->cartones()->attach($cartonesPivot);

            DB::commit();

            // 4️⃣ Respuesta
            return new CompradorResource(
                $comprador->load('compras.cartones')
            );

        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e; // Laravel maneja el error
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function compras(Comprador $comprador)
    {
        // Eager load de cartones en cada compra
        $comprador->load('compras.cartones');
        return CompraResource::collection($comprador->compras);
    }

}
