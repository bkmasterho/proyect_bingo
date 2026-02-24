<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompraResource extends JsonResource
{
     public function toArray(Request $request): array
        {
            return [
                'id' => $this->id,
                'img_compra' => $this->img_compra,
                'fecha' => $this->created_at,
                'cartones' => $this->cartones->map(function($carton) {
                    return [
                        'id' => $carton->id,
                        'numero_carton' => $carton->numero_carton,
                        'sorteo_id' => $carton->pivot->sorteo_id, // dato del pivot
                    ];
                }),
            ];
        }
}
