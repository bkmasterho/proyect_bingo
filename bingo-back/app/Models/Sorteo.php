<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sorteo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'fecha_inicio',
        'fecha_fin',
    ];

    // Un sorteo tiene muchas compras
    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}