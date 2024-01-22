<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kelas;
use App\Models\Materials;
use Illuminate\Support\Facades\Auth;

class KelasController extends Controller
{
    public function index()
    {
        $kelas = Kelas::all();
        return response()->json($kelas);
    }
    public function getClassbyId($id)
    {
        $kelas = Kelas::find($id);
        // $user = User::find($id);
        return response()->json($kelas);
    }
    public function getMaterials($classId)
    {
        // Validasi apakah pengguna terdaftar dalam kelas
        $user = Auth::user();
        $class = Kelas::find($classId);

        if (!$class || !$user->classes()->where('class_id', $classId)->exists()) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk melihat materi kelas ini'], 403);
        }

        // Ambil daftar materi untuk kelas tertentu
        $materials = Materials::where('class_id', $classId)->get();

        return response()->json(['materials' => $materials]);
    }
}
