<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassUser extends Model
{
    use HasFactory;
    protected $table = "class_user";
    protected $primaryKey = "class_user";
    protected $fillable = [
        'class_id',
        'user_id',
    ];
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'class_id');
    }

    // Definisikan relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}