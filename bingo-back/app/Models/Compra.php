<?php

namespace App\Models;

use App\Models\CartonCompra;
use App\Models\Sorteo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $fillable = [
        'comprador_id',
        'sorteo_id',
        'img_compra',
        'fecha',
    ];

    public function comprador()
    {
        return $this->belongsTo(Comprador::class);
    }

    public function sorteo()
    {
        return $this->belongsTo(Sorteo::class);
    }

    // Relación muchos a muchos con cartones
    public function cartones()
    {
        return $this->belongsToMany(Carton::class, 
                    'carton_compra', 
                    'compra_id', 
                    'carton_id')
                    ->using(CartonCompra::class)   // ⚡ Aquí le dices a Laravel usar el modelo pivot
                    ->withPivot('sorteo_id')
                    ->withTimestamps();
    }
}