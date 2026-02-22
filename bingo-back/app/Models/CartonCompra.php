<?php

namespace App\Models;

use App\Models\Sorteo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CartonCompra extends Pivot
{
    use HasFactory;

    protected $table = 'carton_compra';

    protected $fillable = [
        'compra_id',
        'carton_id',
        'sorteo_id',
    ];

    // Método útil: verifica si el cartón aún está disponible para ese sorteo
    public function esDisponible()
    {
        // Si existe otra compra con el mismo cartón y sorteo, no está disponible
        return !$this->carton->compras()
                    ->wherePivot('sorteo_id', $this->sorteo_id)
                    ->where('carton_id', $this->carton_id)
                    ->exists();
    }

    // Relación con el Carton para acceder a sus datos
    public function carton()
    {
        return $this->belongsTo(Carton::class, 'carton_id');
    }

    // Relación con Compra
    public function compra()
    {
        return $this->belongsTo(Compra::class, 'compra_id');
    }

    public function sorteo()
    {
        return $this->belongsTo(Sorteo::class, 'sorteo_id');
    }
}