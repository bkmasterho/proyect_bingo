<?php

namespace App\Models;

use App\Models\Carton;
use App\Models\Comprador;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{

    public function comprador()
    {
        return $this->belongsTo(Comprador::class);
    }

    public function cartones()
    {
        return $this->hasMany(Carton::class);
    }

}
