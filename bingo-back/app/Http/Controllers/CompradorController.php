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
        $sorteoId = 1;

        DB::beginTransaction();

        try {
            //Crear comprador
            $comprador = Comprador::firstOrCreate(
                ['cedula' => $data['cedula']],
                [
                    'nombre' => $data['nombre'],
                    'apellido' => $data['apellido'] ?? 'Sin apellido',
                    'telefono' => $data['telefono'] ?? null,
                ]
            );

            //Crear compra sin imagen primero
            $compra = $comprador->compras()->create([
                'sorteo_id' => $sorteoId,
                'fecha' => now(),
            ]);

            //Subir archivo con nombre cedula_idcompra
            if ($request->hasFile('img_compra')) {
                $extension = $request->file('img_compra')->getClientOriginalExtension();
                $nombreArchivo = $comprador->cedula . '_' . $compra->id . '.' . $extension;

                $rutaArchivo = $request->file('img_compra')
                    ->storeAs('comprobantes', $nombreArchivo, 'public');

                // Actualizar la compra con la ruta del archivo
                $compra->update(['img_compra' => $rutaArchivo]);
            }

            //Asociar cartones
            $cartonIds = Carton::whereIn('numero_carton', $data['cartones'])
                ->pluck('id')
                ->toArray();

            $cartonesPivot = [];
            foreach ($cartonIds as $cartonId) {
                $cartonesPivot[$cartonId] = ['sorteo_id' => $sorteoId];
            }

            if (!empty($cartonesPivot)) {
                $compra->cartones()->attach($cartonesPivot);
            }

            DB::commit();

            return new CompradorResource(
                $comprador->load('compras.cartones')
            );

        } catch (\Throwable $e) {
            DB::rollBack();

            // 5️⃣ Borrar archivo si algo falla
            if (isset($rutaArchivo) && file_exists(storage_path('app/public/' . $rutaArchivo))) {
                unlink(storage_path('app/public/' . $rutaArchivo));
            }

            throw $e;
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
        $comprador->load([
            'compras.cartones',
            'compras.comprador'
        ]);

        return CompraResource::collection($comprador->compras);
    }


    public function buscarPorCedula(Request $request)
    {   

        $request->validate([
            'cedula' => 'required|string',
        ]);

        $comprador = Comprador::where('cedula', $request->cedula)->first();

        if (!$comprador) {
            return response()->json([
                'message' => 'No se encontró ningún comprador con esa cédula.'
            ], 404);
        }

        // Reutiliza la misma lógica de compras()
        $comprador->load(['compras.cartones', 'compras.comprador']);

        return CompraResource::collection($comprador->compras);

    }

}
