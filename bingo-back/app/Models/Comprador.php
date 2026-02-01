<?php

namespace App\Models;

use App\Models\Carton;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comprador extends Model
{
    /** @use HasFactory<\Database\Factories\CompradorFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'cedula',
        'telefono',
        'email'
    ];


    public function cartones()
    {
        return $this->hasMany(Carton::class); // Un comprador tiene muchos cartones
    }

}
