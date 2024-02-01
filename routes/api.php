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



Route::middleware(['auth:sanctum','verified'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/addOrder', [CheckoutController::class, 'placeOrder']);
    Route::get('/getOrders/{id}', [ProductController::class, 'order_details']);
    Route::post('/getOrders/{id}/pay', [ProductController::class, 'updateOrderToPaid']);
    Route::post('/wishlist', [ProductController::class, 'wishlist']);
    Route::post('/profile', [ProductController::class, 'addProfile']);
    Route::post('/profile/{id}', [ProductController::class, 'updateProfile']);
    Route::get('/profile', [ProductController::class, 'profile']);
    Route::get('/userOrders', [ProductController::class, 'userOrders']);
    Route::get('/wishlist', [ProductController::class, 'wishlistList']);
    Route::get('/wishlist/remove/{id}', [ProductController::class, 'deleteWishlistItem']);
    Route::get('/orders/remove/{id}', [ProductController::class, 'deleteOrder']);
    Route::post('/add_review', [ProductController::class, 'add_review']);
    Route::get('/review/delete/{id}', [ProductController::class, 'delete_review']);


});


Route::prefix('/admin')->middleware(['auth:sanctum','AuthAdmin'])->group(function () {


    Route::apiResource('/users', UserController::class);
    // Route::apiResource('/products', ProductController::class);
    Route::get('/products', [ProductController::class,'index']);
    Route::post('/products', [ProductController::class,'store']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::post('/product/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class,'destroy']);
    Route::apiResource('/categories', CategoryController::class);
    Route::post('/getOrders/{id}/deliver', [ProductController::class, 'updateOrderToDelivered']);
    Route::get('/getAllOrders', [ProductController::class, 'allOrders']);
    Route::post('/markAsNewArrive/{id}', [ProductController::class, 'markAsNewArrive']);

});




Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products_price/{min?}/{max?}',[ProductController::class, 'priceList']);
Route::get('/category_products/{id}', [ProductController::class, 'showProducts'])->name('showProducts');
Route::get('/pro/{id}', [ProductController::class, 'product'])->name('showProduct');
Route::get('/home', [ProductController::class, 'home'])->name('home');
Route::get('/shop', [ProductController::class, 'shop'])->name('shop');
Route::post('/search', [ProductController::class, 'search'])->name('search');
Route::get('/search/{query?}', [ProductController::class, 'searchQuery'])->name('searchQuery');
Route::post('/contact_us', [ProductController::class, 'contact_us'])->name('contact_us');

