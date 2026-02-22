<?php

namespace App\Models;

use App\Models\CartonCompra;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carton extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_carton',  // el número real
    ];

    //relacion mucho a muchos con compras
    public function compras()
    {
        return $this->belongsToMany(Compra::class, 
                    'carton_compra', 
                    'carton_id', 
                    'compra_id')
                    ->using(CartonCompra::class)   // ⚡ Modelo pivot también aquí
                    ->withPivot('sorteo_id')
                    ->withTimestamps();
    }

    // Comprobar si un cartón está disponible para un sorteo
    public function disponibleParaSorteo($sorteoId)
    {
        return !$this->compras()->wherePivot('sorteo_id', $sorteoId)->exists();
    }
}