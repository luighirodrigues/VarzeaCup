<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partidas', function (Blueprint $table) {
            $table->id(); // ID da partida
            $table->unsignedBigInteger('time_casa_id'); // Time da casa
            $table->unsignedBigInteger('time_visitante_id'); // Time visitante
            $table->dateTime('horario'); // Horário da partida
            $table->integer('rodada'); // Rodada do campeonato
            $table->timestamps(); // Campos created_at e updated_at

            // Relacionamentos (chaves estrangeiras)
            $table->foreign('time_casa_id')->references('id')->on('times')->onDelete('cascade');
            $table->foreign('time_visitante_id')->references('id')->on('times')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidas');
    }
};
