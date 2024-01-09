<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;


use App\Models\Product;

use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;


class ProductsController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
            // $product->product_img = $request->file('product_img')->store('public/images');
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



        // if ($request->hasFile('product_images')) {
        //     $images = [];
        //     foreach ($request->file('product_images') as $image) {
        //         $images[] = $image->store('public/images');
        //     }
        //     $product->product_images = $images;
        // }
        $product->save();
        // return $product;
        return response($product , 201);

        // $data = $request->validated();
        // if ($request->hasFile('product_img')) {
        //     $productImg = $request->file('product_img');
        //     $productImg->store('public/images');
        // }

        // if ($request->hasFile('product_images')) {
        //     $productImages = $request->file('product_images');
        //     foreach ($productImages as $productImage) {
        //         $productImage->store('public/images');
        //     }
        // }
        // $data = $request->validated();

        // $product = Product::create($data);

        // return response(new ProductResource($product) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Update the product details
           $product->cat_id = $request->input('cat_id');
            $product->product_title = $request->input('product_title');
            $product->product_desc = $request->input('product_desc');
            $product->product_label = $request->input('product_label');
            $product->price = $request->input('price');
            $product->product_psp_price = $request->input('product_psp_price');
            $product->stock = $request->input('stock');

    // Determine the images to delete
    // $imagesToDelete = array_diff($product->product_images, $request->input('product_images'));

    // Delete old images from storage
    // foreach ($imagesToDelete as $image) {
    //     Storage::delete($image);
    // }

        // ... update other product attributes

       // Handle image upload
       if ($image=$request->file('product_img')) {
        $imageName=$image->getClientOriginalName();
        $image->move('products/images',$imageName);
        $product->product_img = $imageName;
        // $product->product_img = $request->file('product_img')->store('public/images');
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

        // Save the updated product
        $product->update();

        // Return a response
        return response()->json(['message' => 'Product updated successfully']);
}





    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
