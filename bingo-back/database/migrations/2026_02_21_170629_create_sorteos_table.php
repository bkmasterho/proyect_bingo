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
        Schema::create('sorteos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');       // nombre del sorteo
            $table->date('fecha_inicio');   // fecha inicio
            $table->date('fecha_fin');      // fecha fin
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sorteos');
    }
};
