<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Community extends Authenticatable
{
    use HasFactory;
    protected $table = "community";
    protected $fillable = [
        'admin_id',
        'admin_name',
        'name',
        'desc',
        'img_url',
    ];
    public function members()
    {
        return $this->belongsToMany(User::class, 'user_join_community', 'community_id', 'user_id')
            ->withTimestamps();
    }
}
