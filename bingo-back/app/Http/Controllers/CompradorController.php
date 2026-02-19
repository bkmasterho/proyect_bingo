<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompradorRequest;
use App\Http\Resources\CompradorResource;
use App\Http\Resources\CompradorCollection;
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
        $compradores = Comprador::select('id', 'nombre', 'telefono', 'cedula')
            ->groupBy('cedula')
            ->get();

        return new CompradorCollection($compradores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompradorRequest $request)
    {

        $data = $request->validated();

        DB::beginTransaction();

        try {
            
            // Crear comprador

            //Adaptar esto los nuevos modelos Comprador, Compra, Carton

            $comprador = Comprador::create([
                'nombre' => $data['nombre'],
                'apellido' => 'prueba',
                'cedula' => '589856',
                'email' => 'prueba@gmail.com',
                'telefono' => $data['telefono'],
            ]);

            // Adaptar cartones al esquema de la BD
           $cartones = collect($data['cartones'])->map(function ($numero) {
                return [
                    'numero_carton' => $numero,
                ];
            })->toArray();

            // Guardar cartones relacionados
            $comprador->cartones()->createMany($cartones);

            DB::commit();

            // Respuesta formateada
            return new CompradorResource(
                $comprador->load('cartones') //Carga el modelo de cartones y en rource lo traigo.
            );


        } catch (\Throwable $e) {
             DB::rollBack();
             throw $e; // deja que Laravel maneje el error
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
}
