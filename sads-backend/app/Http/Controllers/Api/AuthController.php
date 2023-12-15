<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Register(RegisterRequest $request){
        $request->validated($request->all);
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);
        return response()->json([
            'user'=>$user,
            'token'=>$user->createToken('Api Token')->plainTextToken
        ]);
       }

       public function Login(LoginRequest $request){
        $request->validated($request->only(['email','password']));
        if(!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json(['message'=>'Credential does not match'],401);
        }
        $user = User::where('email',$request->email)->first();
        return response()->json([
            'user'=>$user,
            'token'=>$user->createToken("Api Token")->plainTextToken
        ]);
       }

       public function Logout(){
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json([
            'You have successfully logout to your account'
        ]);
       }


}
