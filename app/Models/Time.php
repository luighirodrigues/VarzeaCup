<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Time extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = ['nome', 'vitorias', 'derrotas', 'empates', 'partidas_jogadas'];

    // Relacionamento com Partida (como time da casa)
    public function partidasComoCasa()
    {
        return $this->hasMany(Partida::class, 'time_casa_id');
    }

    // Relacionamento com Partida (como time visitante)
    public function partidasComoVisitante()
    {
        return $this->hasMany(Partida::class, 'time_visitante_id');
    }
}
