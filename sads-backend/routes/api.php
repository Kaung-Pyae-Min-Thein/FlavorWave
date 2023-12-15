<?php





use App\Http\Controllers\api\LogisticPReorderController;
use App\Http\Controllers\api\WareHouseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FilterController;
use App\Http\Controllers\api\FactoryController;
use App\Http\Controllers\Api\PreorderController;
use App\Http\Controllers\api\raw\ProductRawController;
use App\Http\Controllers\Api\Customer\ClientController;
use App\Http\Controllers\Api\Customer\ProductController;
use App\Http\Controllers\api\truck\OrderTruckController;
use App\Http\Controllers\Api\Sales\SalePreorderController;
use App\Http\Controllers\api\status\PermitStatusController;
use App\Http\Controllers\Api\status\PreOrderstatusController;
use App\Http\Controllers\Api\Customer\ClientPreorderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::middleware(['cors'])->group(function () {
    Route::controller(AuthController::class)->group(function(){
        Route::match(['get','post'],'/register','Register');
        Route::match(['get','post'],'/login','Login');
    });
});


Route::middleware('auth:sanctum')->group(function(){
    Route::match(['get','match'],'/logout',[AuthController::class,'Logout']);
    Route::resource('/customer',ClientController::class);
    Route::resource('/preorderItems',ClientPreorderController::class);
    Route::resource('/salePreorder',SalePreorderController::class);
    Route::post('/getProduct',[ProductController::class,'getProduct']);
    Route::resource('/changeOrderStatus',PreOrderstatusController::class);
    Route::resource('/product/raw',ProductRawController::class);
    Route::resource('/order/truck',OrderTruckController::class);
    Route::post('/calendarControl',[FilterController::class,'calendarControl']);
    Route::post('/changePermitStatus',[PermitStatusController::class,'changePermitStatus']);
    Route::post('/getRawList',[FactoryController::class,'getRawList']);
    Route::get('/getFactoryData',[FactoryController::class,'getFactoryData']);
    Route::post('/getPreorderDetail',[PreorderController::class,'getPreorderDetail']);
    Route::resource('/wareHousePreorder',WareHouseController::class);
    Route::resource('/logisticPreorder',LogisticPReorderController::class);
});
