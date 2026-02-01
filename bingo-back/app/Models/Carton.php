<?php

namespace App\Models;

use App\Models\Comprador;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Carton extends Model
{
    /** @use HasFactory<\Database\Factories\CartonFactory> */
    use HasFactory;

    protected $fillable = [
        'comprador_id',
        'numero_carton',
        'imagen_url',
        'disponible'
    ];


    public function comprador()
    {
        return $this->belongsTo(Comprador::class); // Cada cartón pertenece a un comprador
    }

}
