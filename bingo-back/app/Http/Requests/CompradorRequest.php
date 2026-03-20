<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompradorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|max:255',
            'cedula' => 'required|max:255',
            'telefono' => 'required|max:20',
            'apellido' => 'nullable|max:255', // opcional
            //'email' => 'nullable|email|max:255', // opcional y con validación de email
            'img_compra'    => 'required|image|mimes:jpg,jpeg,png|max:2048', // validando imagen
            'cartones' => 'required|array|min:1',
        ];
    }
}
