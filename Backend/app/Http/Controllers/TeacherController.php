<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\Kelas;
use App\Models\Materials;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class TeacherController extends Controller
{
    public function index(){
        $users = Teacher::all();
        return response()->json($users);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:teachers,email',
            'password' => 'required|min:8',
        ]);

        $hashedPassword = Hash::make($request->input('password')); 

        $teacher = Teacher::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $hashedPassword,
        ]);

        $token = $teacher->createToken('authToken')->plainTextToken;
        return response()->json($teacher, 201);
        // return response()->json(['token' => $token], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::guard('teachers')->attempt($credentials)) {
            $teacher = auth()->guard('teachers')->user();
            $token = $teacher->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:teachers,email,' . $id,
        ]);
        $teacher = Teacher::find($id);
        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 404);
        }
        if ($teacher->id !== Auth::id()) {
            return response()->json(['message' => 'Tidak punya akses!'], 403);
        }
        $teacher->name = $request->input('name');
        $teacher->email = $request->input('email');
        $teacher->save();

        return response()->json($teacher);
    }

    public function logout()
    {
        // Mendapatkan guru yang telah login
        $teacher = auth()->user();

        if ($teacher) {
            // Hapus token
            $deletedTokens = $teacher->tokens()->delete();

            if ($deletedTokens > 0) {
                // Jika token berhasil dihapus
                return response()->json(['message' => 'Successfully logged out']);
            } else {
                // Jika tidak ada token yang dihapus
                return response()->json(['message' => 'No tokens to revoke'], 400);
            }
        } else {
            // Jika guru tidak ditemukan
            return response()->json(['message' => 'User not found'], 404);
        }
    }




    public function createClass(Request $request)
    {
        // Mendapatkan guru yang sedang login
        $teacher = auth()->user();
    
        if (!$teacher) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        // Membuat kelas baru
        $class = $teacher->classes()->create([
            'name' => $request->input('name'),
        ]);
    
        return response()->json($class, 201);
    }

    public function createMaterial(Request $request)
    {
        $teacher = Auth::user();

        // Validasi input
        $request->validate([
            'class_id' => 'required|exists:classes,id',
            'title' => 'required|string',
            'type' => 'required|string',
            'file_path' => 'required|string',
        ]);

        // Pastikan pengajar hanya dapat membuat materi untuk kelas yang dia ajar
        $classId = $request->input('class_id');
        if (!$teacher->teachingClasses()->where('id', $classId)->exists()) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk membuat materi di kelas ini'], 403);
        }

        // Simpan materi ke dalam database
        $material = new Materials([
            'class_id' => $classId,
            'teacher_id' => $teacher->id,
            'title' => $request->input('title'),
            'type' => $request->input('type'),
            'file_path' => $request->input('file_path'),
        ]);

        $material->save();

        return response()->json(['message' => 'Materi berhasil dibuat']);
    }
}    