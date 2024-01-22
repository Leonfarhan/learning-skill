<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Kelas;
use App\Models\Community;
use App\Models\UserCommunity;
use App\Models\Materials;
use Illuminate\Database\QueryException;

use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json($users);
    }


    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        $hashedPassword = Hash::make($request->input('password'));

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $hashedPassword,
        ]);

        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json($user, 201);
        // return response()->json(['token' => $token], 201);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        // Validasi data input
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        // Cari pengguna berdasarkan ID
        $user = User::find($id);

        // Periksa apakah pengguna ditemukan
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Periksa apakah pengguna yang mengakses adalah pemilik data atau admin (jika diperlukan)
        if ($user->id !== Auth::id()) {
            return response()->json(['message' => 'Tidak punya akses!'], 403);
        }

        // Update data pengguna
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->save();

        return response()->json($user);
    }
    public function userClasses($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $classes = $user->enrolledClasses;

        return response()->json($classes);
    }

    public function userTeachers($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Mengambil IDs kelas yang diajar oleh pengguna
    $classIds = $user->teachingClasses()->pluck('id');

    // Mengambil pengajar dari kelas-kelas tersebut melalui tabel perantara
    $teachers = User::whereIn('id', function ($query) use ($classIds) {
        $query->select('user_id')
            ->from('class_user')
            ->whereIn('class_id', $classIds);
    })->get();

    return response()->json($teachers);
}
public function myTeacherInClass($classId)
    {
        // Mendapatkan user yang telah login
        $loggedInUser = Auth::user();

        if (!$loggedInUser) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Mengambil dosen pengajar dari kelas tertentu
        $teacher = $loggedInUser->teachingClasses()->where('id', $classId)->first();

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found for the given class'], 404);
        }

        return response()->json($teacher->teacher);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = auth()->user()->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }
    }

    public function logs(){
        return view('login');
    }

    public function logout()
    {
        // Mendapatkan user yang telah login
        $user = auth()->user();

        if ($user) {
            // Mencabut semua token yang dimiliki oleh user
            $user->tokens()->delete();
        }

        // Logout pengguna dari sesi saat ini
        Auth::guard('web')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function userGetClasses($userId)
{
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $classes = $user->getEnrolledClasses();

    return response()->json($classes);
}

public function registerToClass(Request $request, $classId)
    {
        // Memverifikasi bahwa pengguna telah login
        $user = Auth::user();

        // Memeriksa apakah pengguna sudah terdaftar dalam kelas tertentu
        if ($user->classes()->where('class_id', $classId)->exists()) {
            return response()->json(['message' => 'Anda sudah terdaftar dalam kelas ini'], 400);
        }

        // Memeriksa apakah kelas dengan ID tertentu tersedia
        $kelas = Kelas::find($classId);

        if (!$kelas) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        // Mendaftarkan pengguna ke dalam kelas tanpa duplicat
        $user->classes()->attach($classId);
        return response()->json(['message' => 'Berhasil mendaftar ke kelas']);
    }


    public function registerToCommunity($communityId)
    {
        try {
            $user = Auth::user();

            if ($user->joincommunities()->where('community_id', $communityId)->exists()) {
                return response()->json(['message' => 'Anda sudah terdaftar dalam komunitas ini'], 400);
            }

            $user->joincommunities()->attach($communityId);

            return response()->json(['message' => 'Berhasil mendaftar ke komunitas'], 202);
        }catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json(['message' => 'Komunitas tidak tersedia!'], 400);
            }
        }
    }
   
    public function createCommunity(Request $request)
    {
        // Pastikan pengguna sudah terautentikasi
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Pepek'], 404);
        }


        // Validasi input dari pengguna sesuai kebutuhan
        $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'nullable|string',
            'img_url' => 'nullable|string',
        ]);

        // Buat komunitas baru
        $community = Community::create([
            'admin_id' => $user->id,
            'admin_name' => $user->name,
            'name' => $request->input('name'),
            'desc' => $request->input('desc'),
            'img_url' => $request->input('img_url'),
        ]);

        // Tambahkan pengguna sebagai anggota komunitas
        UserCommunity::create([
            'user_id' => $user->id,
            'community_id' => $community->id,
        ]);

        return response()->json(['message' => 'Berhasil membuat komunitas', 'community' => $community], 201);
    }


}       