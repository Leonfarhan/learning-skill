<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained(); // Kunci asing ke tabel class
            $table->foreignId('teacher_id')->constrained(); // Kunci asing ke tabel teacher
            $table->string('title');
            $table->string('type'); // Misalnya 'ppt' atau 'video'
            $table->string('file_path'); // Lokasi penyimpanan file
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('materials');
    }
};
