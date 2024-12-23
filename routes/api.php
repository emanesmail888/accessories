<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\ProductsCntroller;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\GeneralController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::prefix('/v1')->middleware(['auth:sanctum','verified'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
   
    Route::post('/addOrder', [CheckoutController::class, 'placeOrder']);
    Route::get('/getOrders/{id}', [CheckoutController::class, 'order_details']);
    Route::post('/getOrders/{id}/pay', [CheckoutController::class, 'updateOrderToPaid']);
    Route::post('/wishlist', [GeneralController::class, 'wishlist']);
    Route::post('/profile', [GeneralController::class, 'addProfile']);
    Route::post('/profile/{id}', [GeneralController::class, 'updateProfile']);
    Route::get('/profile', [GeneralController::class, 'profile']);
    Route::get('/userOrders', [CheckoutController::class, 'userOrders']);
    Route::get('/wishlist', [GeneralController::class, 'wishlistList']);
    Route::get('/wishlist/remove/{id}', [GeneralController::class, 'deleteWishlistItem']);
    Route::get('/orders/remove/{id}', [CheckoutController::class, 'deleteOrder']);
    Route::post('/add_review', [GeneralController::class, 'add_review']);
    Route::get('/review/delete/{id}', [GeneralController::class, 'delete_review']);


});


Route::prefix('/v1/admin')->middleware(['auth:sanctum','AuthAdmin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    // Route::apiResource('/products', ProductController::class);
    Route::get('/products', [ProductController::class,'index']);
    Route::post('/products', [ProductController::class,'store']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::post('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class,'destroy']);
    Route::apiResource('/categories', CategoryController::class);
    Route::post('/getOrders/{id}/deliver', [CheckoutController::class, 'updateOrderToDelivered']);
    Route::get('/getAllOrders', [CheckoutController::class, 'allOrders']);
    Route::post('/markAsNewArrive/{id}', [GeneralController::class, 'markAsNewArrive']);

});



Route::prefix('v1')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'reset']);
    Route::get('/products_price/{min?}/{max?}',[GeneralController::class, 'priceList']);
    Route::get('/category_products/{id}', [GeneralController::class, 'showProducts'])->name('showProducts');
    Route::get('/pro/{id}', [GeneralController::class, 'product'])->name('showProduct');
    Route::get('/home', [GeneralController::class, 'home'])->name('home');
    Route::get('/shop', [GeneralController::class, 'shop'])->name('shop');
    Route::post('/search', [GeneralController::class, 'search'])->name('search');
    Route::get('/search/{query?}', [GeneralController::class, 'searchQuery'])->name('searchQuery');
    Route::post('/contact_us', [GeneralController::class, 'contact_us'])->name('contact_us');

});
