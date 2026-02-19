<?php

namespace App\Models;

use App\Models\Compra;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carton extends Model
{
    /** @use HasFactory<\Database\Factories\CartonFactory> */
    use HasFactory;

    protected $fillable = [
        'compra_id',
        'numero_carton',
    ];


    public function compra()
    {
        return $this->belongsTo(Compra::class);
    }

}
