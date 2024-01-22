<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Materials;
use App\Models\Teacher;
use App\Models\Kelas;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class MaterialController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'class_id' => 'required|exists:classes,id',
            'title' => 'required|string',
            'type' => 'required|in:ppt,video',
            'file' => 'required|file|mimes:ppt,pptx,mp4',
        ]);

        $teacher = Auth::guard('teachers')->user();

        if (!$teacher) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $classId = $request->input('class_id');
        $title = $request->input('title');
        $type = $request->input('type');
        $file = $request->file('file');

        // Simpan file ke penyimpanan
        $filePath = $file->store('materials');

        // Buat materi baru
        $material = Materials::create([
            'class_id' => $classId,
            'teacher_id' => $teacher->id,
            'title' => $title,
            'type' => $type,
            'file_path' => $filePath,
        ]);

        return response()->json($material, 201);
    }
    public function getMaterials($classId)
    {
        // Validasi apakah pengguna terdaftar dalam kelas
        $user = Auth::user();
        $class = Kelas::find($classId);

        if (!$class || !$user->classes()->where('id', $classId)->exists()) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk melihat materi kelas ini'], 403);
        }

        // Ambil daftar materi untuk kelas tertentu
        $materials = Materials::where('class_id', $classId)->get();

        return response()->json(['materials' => $materials]);
    }
}
