<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartidaResource extends JsonResource
{
    public static $wrap = false;

    
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'time_casa_id' => $this->time_casa_id,
            'time_visitante_id' => $this->time_visitante_id,
            'horario' => $this->horario,
            'rodada' => $this->rodada
        ];
    }
}