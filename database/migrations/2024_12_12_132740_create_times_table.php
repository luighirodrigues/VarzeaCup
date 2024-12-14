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
        Schema::create('times', function (Blueprint $table) {
            $table->id(); // ID do time
            $table->string('nome')->unique(); // Nome do time
            $table->integer('vitorias')->default(0); // Quantidade de vitórias
            $table->integer('derrotas')->default(0); // Quantidade de derrotas
            $table->integer('empates')->default(0); // Quantidade de empates
            $table->integer('partidas_jogadas')->default(0); // Partidas jogadas
            $table->timestamps(); // Campos created_at e updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('times');
    }
};
