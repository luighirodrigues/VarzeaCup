<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePartidaRequest extends FormRequest
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
            'time_casa_id' => 'sometimes|exists:times,id', // Campo opcional
            'time_visitante_id' => 'sometimes|exists:times,id|different:time_casa_id',
            'horario' => 'sometimes|date',
            'rodada' => 'sometimes|integer|min:1',
        ];
    }

    /**
     * Mensagens de erro personalizadas (opcional).
     */
    public function messages(): array
    {
        return [
            'time_casa_id.exists' => 'O time da casa informado não existe.',
            'time_visitante_id.exists' => 'O time visitante informado não existe.',
            'time_visitante_id.different' => 'Os times da casa e visitante devem ser diferentes.',
            'horario.date' => 'O horário deve ser uma data válida.',
            'rodada.integer' => 'A rodada deve ser um número inteiro.',
            'rodada.min' => 'A rodada deve ser pelo menos 1.',
        ];
    }
}
