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
        Schema::rename('compradors', 'compradores');
    }

    public function down(): void
    {
        Schema::rename('compradores', 'compradors');
    }
};
