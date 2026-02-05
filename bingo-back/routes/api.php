<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CompradorController;
use App\Http\Controllers\CartonController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('/compradores', CompradorController::class);
Route::apiResource('/cartones', CartonController::class);
