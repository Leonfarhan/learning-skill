<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ThreadController;
use App\Models\Teacher;
use App\Models\UserCommunity;

// use App\Models\Teacher;

Route::post('/user/register', [UserController::class, 'register']); // daftar done
Route::post('/user/login', [UserController::class, 'login']); //login done
Route::get('/user', [UserController::class, 'index']); //get list user done
Route::middleware('auth:sanctum')->post('/user/logout', [UserController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user/{id}', [UserController::class, 'show']); // get detail acc (login first) done
Route::middleware('auth:sanctum')->put('/user/{id}', [UserController::class, 'update']);// update profile (login|admin) done
// Route::middleware('auth:sanctum')->get('/user/{id}/classes', [UserController::class, 'userClasses']); // Get info class (login) done
// melihat class yang tersedia setelah login
Route::middleware('auth:sanctum')->get('/user/{id}/classes', [UserController::class, 'userGetClasses']); //melihat kelas yang diikuti
// Route::middleware('auth:sanctum')->get('/user/kelas', [KelasController::class, 'index']);
Route::middleware('auth:sanctum')->post('/user/register/{classId}', [UserController::class, 'registerToClass']);
Route::middleware('auth:sanctum')->post('/user/registercom/{comId}', [UserController::class, 'registerToCommunity']);
Route::middleware('auth:sanctum')->post('createcommunity', [UserController::class, 'createCommunity']);


// ============================Teacher============================
Route::get('/teacher', [TeacherController::class, 'index']); //get list user done
Route::post('/teacher/login', [TeacherController::class, 'login']);
Route::post('/teacher/register', [TeacherController::class, 'register']); 
Route::post('/teacher/logout', [TeacherController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->put('/teacher/{id}', [TeacherController::class, 'update']);// update profile (login|admin) done
Route::middleware('auth:sanctum')->post('/teacher/createclass', [TeacherController::class, 'createClass']);

Route::get('/kelas', [KelasController::class, 'index']); //get list user done
Route::get('/kelas/{id}', [KelasController::class, 'getClassbyId']); //get list user done
Route::get('/kelas/{id}', [KelasController::class, 'getClassbyId']); //get list user done
Route::middleware('auth:sanctum')->post('/teacher/create-material', [TeacherController::class, 'createMaterial']);

// Route::middleware('auth:sanctum')->get('/class/{classId}/materials', [ClassController::class, 'getMaterials']);
Route::middleware('auth:sanctum')->get('/class/{classId}/materials', [KelasController::class, 'getMaterials']);

// Route::get('/user/{id}/classes', [UserController::class, 'userGetClasses']);

// Route::get('/thread', [ThreadController::class, 'index']); //get list user done
Route::middleware('auth:sanctum')->post('/thread', [ThreadController::class, 'createThread']);
Route::middleware('auth:sanctum')->get('/thread', [ThreadController::class, 'getThread']);
