<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Wishlist;
use App\Models\Profile;
use App\Models\Contact;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;







class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(Product::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {

        $product = new Product;
        // Set other product properties
        $product->cat_id = $request->input('cat_id');
        $product->product_title = $request->input('product_title');
        $product->product_desc = $request->input('product_desc');
        $product->product_label = $request->input('product_label');
        $product->price = $request->input('price');
        $product->product_psp_price = $request->input('product_psp_price');
        $product->stock = $request->input('stock');
        // Handle image upload
        if ($image=$request->file('product_img')) {
            $imageName=$image->getClientOriginalName();
            $image->move('products/images',$imageName);
            $product->product_img = $imageName;
        }
        // Handle images upload
        $images=array();
        if($files=$request->file('product_images')){
            foreach($files as $file){
                $name=$file->getClientOriginalName();
                $file->move('images',$name);
                $images[]=$name;
                $product->product_images = json_encode($images);
            }

        }
        $product->save();
        return response($product , 201);
        // return response(new ProductResource($product) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->cat_id = $request->cat_id;
        $product->product_title = $request->product_title;
        $product->product_desc = $request->product_desc;
        $product->product_label = $request->product_label;
        $product->price = $request->price;
        $product->product_psp_price = $request->product_psp_price;
        $product->stock = $request->stock;
        // $product->product_img = $request->file('product_img')->getClientOriginalName();
        // $request->file('product_img')->store('products/images');
        if ($image=$request->file('product_img')) {
            $imageName=$image->getClientOriginalName();
            $image->move('products/images',$imageName);
            $product->product_img = $imageName;
        }
         $images=array();
         if($files=$request->file('product_images')){
             foreach($files as $file){
                 $name=$file->getClientOriginalName();
                 $file->move('images',$name);
                 $images[]=$name;
             }
             $product->product_images =json_encode($images) ;

         }
        $product->save();
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {

            if (file_exists('products/images/' . $product->product_img)) {
                   unlink('products/images/' . $product->product_img);
                }
            if (json_decode($product->product_images) >0) {
                foreach (json_decode($product->product_images) as $media) {
                    if (file_exists('images/' . $media)) {
                        unlink('images/' . $media);
                    }
                }
            }
            $product->delete();

            return response()->json(['errors' => false, 'message' => 'Product deleted successfully'], 200);

        // return response()->json(['errors' => true, 'message' => 'Something was wrong'], 200);
    }


public function priceList(Request $request)
{
    $min = $request->query('min');
    $max = $request->query('max');

    if ($min && $max) {
        $products = Product::whereBetween('price', [$min, $max])->get();

    }
    else{
        $products = Product::all();


    }
    return response()->json(['products'=>$products]);


}



public function showProducts($id)
{

    $categories=Category::all();
    $category=Category::findOrFail($id);
    $products = Product::where('cat_id', $id)->get();

    $a_products =  Product::where('cat_id', $id)->get();


    return response()->json(['products'=>$products,'a_products'=>$a_products]);

}
public function home()
{


    $categories=Category::all();
    $products=Product::inRandomOrder()->get()->take(15);
    $p_products=Product::inRandomOrder()->get()->take(8);
    $newArrival_products=Product::where('new_arrival','=', 1)->inRandomOrder()->get()->take(8);



    return response()->json(['products'=>$products,'categories'=>$categories,'p_products'=>$p_products,'newArrival_products'=>$newArrival_products]);


}
public function shop()
{


    $categories=Category::all();
    $products=Product::inRandomOrder()->get();



    return response()->json(['products'=>$products,'categories'=>$categories]);


}
public function product($id)
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
public function order_details($id)
{
    $order = Order::where('id', $id)->get();
    // $order_items = OrderItem::where('order_id', $id)->get();
    $order_items =DB::table('order_items')->where('order_id','=',$id)->leftJoin('products', 'order_items.product_id', '=',  'products.id')->get();


     return response()->json([$order,$order_items]);
     return response()->json([$order,$order_items]);
}



public function updateOrderToPaid($id)
{
    $order = Order::find($id);

    if ($order) {
        $order->isPaid = true;
        $order->paidAt = now()->format('Y-m-d');
        $order->save();

        return response()->json([$order]);
    }

    return response()->json(['message' => 'Order not found'], 404);
}


public function updateOrderToDelivered($id)
{
    $order = Order::find($id);

    if ($order) {
        $order->isDeliver = true;
        $order->deliveredAt = now()->format('Y-m-d');
        $order->save();

        return response()->json([$order]);
    }

    return response()->json(['message' => 'Order not found'], 404);
}


public function userOrders()
{

    $user_id = Auth::user()->id;
    $order = Order::where('user_id', $user_id)->get();
    if ($order) {
        return response()->json([$order]);
    }
    return response()->json(['message' => 'Order not found'], 404);
}


public function allOrders()
{
    $order = Order::all();
    if ($order) {
        return response()->json([$order]);
    }
    return response()->json(['message' => 'Orders not found'], 404);
}

public function deleteOrder($id) {
    $order=Order::where([['id','=' , $id] ,['user_id', '=' , Auth::user()->id]])->delete();
    return response("", 204);
}


public function wishlist(Request $request) {
    $product_id = Product::where('id', $request->productId)->first();
    $wishList = new Wishlist;
    $wishList->user_id = Auth::user()->id;
    $wishList->product_id = $request->productId;

    $wishList->save();

    $result =DB::table('wishlists')->where('product_id','=',$request->productId)->leftJoin('products', 'wishlists.product_id', '=',  'products.id')->first();

    return response()->json([$result]);
    }


public function wishlistList() {
    $user=Auth::user()->id;
    $wishList = DB::table('wishlists')->where('user_id','=',$user)->leftJoin('products', 'wishlists.product_id', '=', 'products.id')->get();

    return response()->json([$wishList]);
    }

public function deleteWishlistItem($id) {

    $wishlist=Wishlist::where([['product_id','=' , $id] ,['user_id', '=' , Auth::user()->id]])->delete();

    return response("", 204);
}


public function addProfile(Request $request)
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

    return response($profile , 201);

        }



        public function updateprofile(Request $request,$id)
        {
            $profile = Profile::find($id);

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
            return response($profile , 201);
           }
          }
        public function markAsNewArrive(Request $request,$id)
        {
            $product = Product::find($id);

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



public function profile(Request $request)
{
    $user=Auth::user()->id;
    $profile = DB::table('profiles')->where('user_id','=',$user)->first();
    return response()->json($profile);

}


   public function search(Request $request)
    {
    $query = $request->body;
    $products = Product::where('product_title', 'LIKE', "%$query%")->get();
    return response($products , 201);
    }
   public function searchQuery($query)
    {
    $products = Product::where('product_title', 'LIKE', "%$query%")->get();
    return response($products , 201);
    }
   public function contact_us(Request $request)
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

    public function add_review(Request $request)
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

    public function delete_review($id)
    {
        $review = Review::find($id);

        if ($review) {
        DB::table('reviews')->where([ ['id' ,'=',  $id ],['user_id' , '=' ,Auth::user()->id]])->delete();
        return response("", 204);
    }

        return response()->json(['message' => 'Review not found'], 404);
    }




    }









