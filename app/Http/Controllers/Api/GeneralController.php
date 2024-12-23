<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Wishlist;
use App\Models\Profile;
use App\Models\Contact;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GeneralController extends Controller
{
    //display products according to price
    public function priceList(Request $request): JsonResponse
    {
        $min = $request->query('min');
        $max = $request->query('max');
        if ($min && $max) {
            $products = Product::whereBetween('price', [$min, $max])->get();
         }
        else{
            $products = Product::cursor();
        }
        return response()->json(['products'=>$products]);

    }


    //display the products of specific category
    public function showProducts($id): JsonResponse
    {
        $categories=Category::cursor();
        $category=Category::findOrFail($id);
        $products = Product::where('cat_id', $id)->get();
        $a_products =  Product::where('cat_id', $id)->get();
        return response()->json(['products'=>$products,'a_products'=>$a_products]);

    }


    //display categories and products in home page
    public function home(): JsonResponse
    {
        $categories=Category::cursor();
        $products=Product::inRandomOrder()->get()->take(15);
        $p_products=Product::inRandomOrder()->get()->take(8);
        $newArrival_products=Product::where('new_arrival','=', 1)->inRandomOrder()->get()->take(8);
        return response()->json(['products'=>$products,'categories'=>$categories,'p_products'=>$p_products,'newArrival_products'=>$newArrival_products]);

    }

    //display categories and products in shop page
    public function shop(): JsonResponse
    {
        $categories=Category::cursor();
        $products=Product::inRandomOrder()->get();
        return response()->json(['products'=>$products,'categories'=>$categories]);
    }


   //get details of product
    public function product($id): JsonResponse
    {
        $product = Product::where('id', $id)->first();
        $c_product=$product->cat_id;
        $reviewsCount = DB::table('reviews')->where('product_id',$id)->count();
        $reviewsAvg= DB::table('reviews')->where('product_id',$id)->avg('rating');
        $reviews = DB::table('users')
        ->leftJoin('reviews', 'users.id', '=', 'reviews.user_id')
        ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')
        ->where('reviews.product_id','=' , $id)
        ->select('users.name','reviews.id','reviews.rating','reviews.review','reviews.user_id','profiles.image','reviews.created_at')
        ->get();
        $best_products=Product::inRandomOrder()->get()->take(3);
        $related_products=Product::where('cat_id','=', $c_product)->inRandomOrder()->get()->take(4);
        return response()->json(['product' =>$product,'reviews' =>$reviews,'reviewsAvg'=>$reviewsAvg,'reviewsCount'=>$reviewsCount,'related_products'=>$related_products,'best_products'=>$best_products]);

    }


   //add product to wishlist by authorized user
   public function wishlist(Request $request): JsonResponse
   {
        $product_id = Product::where('id', $request->productId)->first();
        $wishList = new Wishlist;
        $wishList->user_id = Auth::user()->id;
        $wishList->product_id = $request->productId;
        $wishList->save();
        $result =DB::table('wishlists')->where('product_id','=',$request->productId)->leftJoin('products', 'wishlists.product_id', '=',  'products.id')->first();
        return response()->json([$result]);
   }

    //display the wishlist of specific user
    public function wishlistList(): JsonResponse
    {
        $user=Auth::user()->id;
        $wishList = DB::table('wishlists')->where('user_id','=',$user)->leftJoin('products', 'wishlists.product_id', '=', 'products.id')->get();
        return response()->json([$wishList]);
    }


    //delete product from wishlist
    public function deleteWishlistItem($id): Response
    {
        $wishlist=Wishlist::where([['product_id','=' , $id] ,['user_id', '=' , Auth::user()->id]])->delete();
        return response("", 204);
    }

    //add profile of logged in user
    public function addProfile(Request $request): JsonResponse
    {
        $user=Auth::user()->id;
        $profile = new Profile;
        $profile->user_id = $user;
        $profile->mobile = $request->input('mobile');
        $profile->address1 = $request->input('address1');
        $profile->address2 = $request->input('address2');
        $profile->city = $request->input('city');
        $profile->country = $request->input('country');
        $profile->zipCode = $request->input('zipCode');

        // Handle image upload
        if ($image=$request->file('image')) {
            $imageName=$image->getClientOriginalName();
            $image->move('profiles/images',$imageName);
            $profile->image = $imageName;
        }
        $profile->save();

        return response()->json($profile, 201);

    }


    //update the profile of user
    public function updateprofile(Request $request,$id): JsonResponse
    {
        $profile = Profile::findOrFail($id);

        if ($profile) {
        $user=Auth::user()->id;
        $profile->user_id = $user;
        $profile->mobile = $request->input('mobile');
        $profile->address1 = $request->input('address1');
        $profile->address2 = $request->input('address2');
        $profile->city = $request->input('city');
        $profile->country = $request->input('country');
        $profile->zipCode = $request->input('zipCode');
        // Handle image upload
        if ($image=$request->file('image')) {
            $imageName=$image->getClientOriginalName();
            $image->move('profiles/images',$imageName);
            $profile->image = $imageName;
        }
        $profile->save();
        return response()->json($profile, 201);
        }

    }

    //Admin mark product as newArrive
    public function markAsNewArrive(Request $request,$id): JsonResponse
    {
        $product = Product::findOrFail($id);
        if ($product) {
            if($request->body === true){
                $new_arrival ='1';
            }
            else{
                $new_arrival= '0';
            }
            $product->new_arrival = $new_arrival;

            $product->save();
            return response()->json([$product]);
        }
        return response()->json(['message' => 'Product not found'], 404);

    }


    //get the profile of authorized user or admin
    public function profile(Request $request): JsonResponse
    {
        $user=Auth::user()->id;
        $profile = DB::table('profiles')->where('user_id','=',$user)->first();
        return response()->json($profile);
    }


   // search in products with query
   public function search(Request $request): JsonResponse
   {
        $query = $request->body;
        $products = Product::where('product_title', 'LIKE', "%$query%")->get();
        // return response($products , 201);
        return response()->json($products, 200);

    }

   // search in products with query
   public function searchQuery($query): JsonResponse
   {
    $products = Product::where('product_title', 'LIKE', "%$query%")->get();
    //return response($products , 201);
    return response()->json($products, 200);

    }

   //contact with site
   public function contact_us(Request $request): JsonResponse
   {

      $this->validate($request,[
        "name"=>'required',
        "email"=>'required|email',
        "subject"=>'required',
        "message"=>'required'

      ]);

      $contact=Contact::create([
        "name"=>$request->name,
        "email"=>$request->email,
        "subject"=>$request->subject,
        "message"=>$request->message
      ]);
      return response()->json([$contact], 201);

    }

    //add review by logged in user
    public function add_review(Request $request): JsonResponse
    {
        $this->validate($request,[
            "product_id"=>'required',
            "user_id"=>'required',
            "rating"=>'required|numeric',
            "review"=>'required'

          ]);
        $review=Review::create([
        "product_id"=>$request->product_id,
        "user_id"=>$request->user_id,
        "rating"=>$request->rating,
        "review"=>$request->review
        ]);
        return response()->json([$review], 201);
    }

   //delete review by authorized user
    public function delete_review($id)
    {
        $review = Review::findOrFail($id);
        if ($review)
         {
            DB::table('reviews')->where([ ['id' ,'=',  $id ],['user_id' , '=' ,Auth::user()->id]])->delete();
            return response("", 204);
         }
        return response()->json(['message' => 'Review not found'], 404);
    }




}
