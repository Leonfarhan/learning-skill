<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thread;
use Illuminate\Support\Facades\Log;

class ThreadController extends Controller
{
    public function createThread(Request $request)
    {
        try{

            $request->validate([
                'community_id' => 'required|exists:community,id',
                'image_url' => 'nullable|string',
                'caption' => 'required|string',
            ]);
    
            $user = auth()->user();
    
            // Buat thread baru
            $thread = Thread::create([
                'community_id' => $request->community_id,
                'user_id' => $user->id,
                'image_url' => $request->image_url,
                'caption' => $request->caption,
            ]);
    
            return response()->json(['message' => 'Thread created successfully', 'thread' => $thread]);
        }
    catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
    } catch (\Exception $e) {
        Log::error($e);
        return response()->json(['message' => 'An error occurred while creating the thread'], 500);
    }
    
    }
}
