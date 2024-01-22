<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;
    protected $table = "classes";
    protected $fillable = [
        'name',
        'teacher_id',
    ];
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
