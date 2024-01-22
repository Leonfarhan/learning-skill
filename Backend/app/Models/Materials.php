<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materials extends Model
{
    use HasFactory;
    protected $fillable = ['class_id', 'teacher_id', 'title', 'type', 'file_path'];

}
