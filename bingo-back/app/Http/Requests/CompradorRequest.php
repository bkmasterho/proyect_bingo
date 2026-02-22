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
            'email' => 'nullable|email|max:255', // opcional y con validación de email
            'img_compra' => 'nullable|string|max:255', // opcional
            'cartones' => 'required|array|min:1',
            'sorteo_id' => 'required', // obligatorio, debe existir en la tabla sorteos
        ];
    }
}
