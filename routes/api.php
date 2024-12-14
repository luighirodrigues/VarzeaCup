<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\TimeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::get('logout',[AuthController::class,'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    route::apiResource('/users', UserController::class);
    route::apiResource('/times', TimeController::class);
    route::apiResource('/partidas', PartidaController::class);
});
Route::get('tabela',[TimeController::class,'index']);
Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);
