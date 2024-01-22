<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;
    protected $table = "thread";
    protected $fillable = ["community_id",	"user_id",	"image_url",	"caption"	];
}
