<?php

namespace App\Models;

use App\Models\Compra;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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


    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}
