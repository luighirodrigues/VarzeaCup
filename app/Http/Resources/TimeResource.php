<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimeResource extends JsonResource
{
    public static $wrap = false;

    
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'nome' => $this->nome,
            'vitorias' => $this->vitorias,
            'derrotas' => $this->derrotas,
            'empates' => $this->empates,
            'partidas_jogadas' => $this->partidas_jogadas,
            'pontuacao' => $this->pontuacao,
        ];
    }
}