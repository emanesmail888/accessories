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

        if (file_exists('products/images/' . $product->product_img))
         {
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
    }



}
