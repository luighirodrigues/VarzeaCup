<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePartidaRequest extends FormRequest
{
    /**
     * Determinar se o usuário está autorizado a fazer esta requisição.
     */
    public function authorize(): bool
    {
        return true; // Mantenha como true para permitir requisições
    }

    /**
     * Regras de validação para a requisição.
     */
    public function rules(): array
    {
        return [
            'time_casa_id' => 'required|exists:times,id',
            'time_visitante_id' => 'required|exists:times,id|different:time_casa_id',
            'horario' => 'required|date',
            'rodada' => 'required|integer|min:1',
        ];
    }

    /**
     * Mensagens de erro personalizadas (opcional).
     */
    public function messages(): array
    {
        return [
            'time_casa_id.required' => 'O campo time da casa é obrigatório.',
            'time_visitante_id.required' => 'O campo time visitante é obrigatório.',
            'time_visitante_id.different' => 'Os times da casa e visitante devem ser diferentes.',
            'horario.required' => 'O campo horário é obrigatório.',
            'rodada.required' => 'O campo rodada é obrigatório.',
        ];
    }
}