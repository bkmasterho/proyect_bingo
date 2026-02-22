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
       Schema::create('compras', function (Blueprint $table) {
            $table->id();

            $table->foreignId('comprador_id')
                ->constrained('compradores')
                ->cascadeOnDelete();

            // Nueva columna: relación con sorteo
            $table->foreignId('sorteo_id')
                  ->constrained('sorteos') // asegúrate de crear tabla 'sorteos'
                  ->cascadeOnDelete();

            $table->string('img_compra')->nullable();
            $table->date('fecha');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compras');
    }
};
