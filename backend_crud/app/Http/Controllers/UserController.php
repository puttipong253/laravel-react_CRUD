<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller{

    public function index(){
        return User::all();
    }

    public $successStatus = 200;

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);
        }

        if ($request->hasfile('avatar')) {
            $fileAvatar = $request->file('avatar');
            $extension = $fileAvatar->getClientOriginalExtension();
            $avatarName = time().'1'. '.' .$extension;
            $avatarPath = $fileAvatar->storeAs('',$avatarName, 'public');

            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $input['avatar'] = $avatarName;
            $user = User::create($input);

            $user['token'] =  $user->createToken('access_token')->accessToken;
            return response()->json(['user'=>$user], $this->successStatus);
        }
    }

    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $user['token'] =  $user->createToken('access_token')->accessToken;
            return response()->json(['user'=>$user], $this->successStatus);
        }else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function details(){
        $user = Auth::user();
        return response()->json([$user], $this->successStatus);
    }
}
