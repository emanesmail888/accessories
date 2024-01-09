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

// Route::middleware(['auth:sanctum','verified'])->group(function () {
//     Route::get('/user/dashboard',UserDashboardComponent::class)->name('user.dashboard');
//     Route::get('/user/orders',UserOrdersComponent::class)->name('user.orders');
//     Route::get('/user/orders/{order_id}',UserOrderDetailsComponent::class)->name('user.orderDetails');
//     Route::get('/user/review/{order_item_id}',UserReviewComponent::class)->name('user.review');
//     Route::get('/user/change-password',UserChangePasswordComponent::class)->name('user.changePassword');
//     Route::get('/user/profile',ProfileComponent::class)->name('user.profile');
//     Route::get('/user/profile/edit',UserEditProfileComponent::class)->name('user.editProfile');

// });


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
    Route::get('/profile', [ProductController::class, 'profile']);
    Route::get('/userOrders', [ProductController::class, 'userOrders']);
    Route::get('/wishlist', [ProductController::class, 'wishlistList']);
    Route::get('/wishlist/remove/{id}', [ProductController::class, 'deleteWishlistItem']);


});


Route::prefix('/admin')->middleware(['auth:sanctum','AuthAdmin'])->group(function () {


    Route::apiResource('/users', UserController::class);
    Route::apiResource('/products', ProductController::class);
   //  Route::apiResource('/products', ProductsController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::post('/product/{id}', [ProductController::class, 'update']);



});




Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products_price/{min?}/{max?}',[ProductController::class, 'priceList']);
Route::get('/category_products/{id}', [ProductController::class, 'showProducts'])->name('showProducts');
Route::get('/pro/{id}', [ProductController::class, 'product'])->name('showProduct');
Route::get('/home', [ProductController::class, 'home'])->name('home');
Route::get('/shop', [ProductController::class, 'shop'])->name('shop');

