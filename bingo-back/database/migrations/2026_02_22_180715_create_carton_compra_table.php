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
        Schema::create('carton_compra', function (Blueprint $table) {
            $table->id();

            $table->foreignId('compra_id')
                  ->constrained('compras')
                  ->cascadeOnDelete();

            $table->foreignId('carton_id')
                  ->constrained('cartons')
                  ->cascadeOnDelete();

            $table->foreignId('sorteo_id')
                  ->constrained('sorteos')
                  ->cascadeOnDelete();

            $table->timestamps();

            // Un cartón solo puede estar comprado una vez por sorteo
            $table->unique(['carton_id', 'sorteo_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carton_compra');
    }
};
