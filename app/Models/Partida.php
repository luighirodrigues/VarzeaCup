<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    use HasFactory;

    protected $fillable = ['time_casa_id', 'time_visitante_id', 'horario', 'rodada'];

    // Relacionamento com Time (time da casa)
    public function timeCasa()
    {
        return $this->belongsTo(Time::class, 'time_casa_id');
    }

    // Relacionamento com Time (time visitante)
    public function timeVisitante()
    {
        return $this->belongsTo(Time::class, 'time_visitante_id');
    }
}
