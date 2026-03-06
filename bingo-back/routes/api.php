    <?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartonController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\CompradorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


    //Uso group porque son varias rutas protegidas con sanctum
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::post('/logout', [AuthController::class, 'logout']);

    });

    // Compradores admin (CRUD completo) LUEGO MOVER DENTRO DE SANCTUM
    Route::apiResource('/compradores', CompradorController::class)
        ->only(['index','update', 'destroy']);

    // Compradores públicos (solo lectura)
    Route::apiResource('/compradores', CompradorController::class)
        ->only(['show','store']);
        
    Route::get('/compradores/{comprador}/compras', [CompradorController::class, 'compras']);

    Route::apiResource('/compras', CompraController::class);

    Route::apiResource('/cartones', CartonController::class);

    //Autenticacion
    Route::post('/registro', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
