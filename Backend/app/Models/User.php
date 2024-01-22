<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public function classUserRecords()
    {
        return $this->hasMany(ClassUser::class, 'user_id');
    }
    
    public function classes()
    {
        return $this->belongsToMany(Kelas::class, 'class_user', 'user_id', 'class_id')->withTimestamps();
    }
    public function joincommunities()
    {
        return $this->belongsToMany(Community::class, 'user_join_community', 'user_id', 'community_id')
            ->withTimestamps();
    }


    public function communities()
    {
        return $this->belongsToMany(Community::class, 'community', 'admin_id', 'id')
            ->withTimestamps();
    }
    public function getEnrolledClasses()
    {
        // Pastikan properti classUserRecords tidak null sebelum memanggil map()
        return $this->classUserRecords ? $this->classUserRecords->map(function ($classUserRecord) {
            return $classUserRecord->kelas;
        }) : collect();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
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
