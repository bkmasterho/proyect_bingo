<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cartons', function (Blueprint $table) {
            // Para quitar un unique, primero hay que conocer el nombre del índice
            $table->dropUnique('cartons_numero_carton_unique');
        });
    }

    public function down(): void
    {
        Schema::table('cartons', function (Blueprint $table) {
            $table->unique('numero_carton');
        });
    }
};
