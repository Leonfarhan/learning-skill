<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Teacher extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "teachers";
    protected $primaryKey = "id";
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function classes(){
        return $this->hasMany(Kelas::class);
    }
    

    public function teachingClasses()
    {
        return $this->hasMany(Kelas::class, 'teacher_id', 'id');
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
