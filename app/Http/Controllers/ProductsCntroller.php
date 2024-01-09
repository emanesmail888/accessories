<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\UpdateProductRequest;



class ProductsCntroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();

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
            $product->name = $request->input('name');
            // Handle image upload
            if ($request->hasFile('product_img')) {
                $product->product_img = $request->file('product_img')->store('public/images');
            }
            // Handle images upload
            if ($request->hasFile('product_images')) {
                $images = [];
                foreach ($request->file('product_images') as $image) {
                    $images[] = $image->store('public/images');
                }
                $product->product_images = $images;
            }
            $product->save();
            return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     return $product;

    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, $id)
    // {
    //     // Update other product properties
    //     $product->name = $request->input('name');
    //     // Handle image upload
    //     if ($request->hasFile('image')) {
    //         $product->image = $request->file('image')->store('public/images');
    //     }
    //     // Handle images upload
    //     if ($request->hasFile('images')) {
    //         $images = [];
    //         foreach ($request->file('images') as $image) {
    //             $images[] = $image->store('public/images');
    //         }
    //         $product->images = $images;
    //     }
    //     $product->save();
    //     return $product;
    // }

    public function show($id)
    {
       // User Detail 
       $products = Product::find($id);
       if(!$products){
         return response()->json([
            'message'=>'User Not Found.'
         ],404);
       }
       
       // Return Json Response
       return response()->json([
          'products' => $products
       ],200);
    }
   
    public function update(Request $request, $id)
    {

        $products = Product::find($id);
        // if($products){
        //     return response()->json($products);

        // }
        // try {
        //     // Find User
        //     $products = Product::find($id);
        //     if(!$products){
        //       return products()->json([
        //         'message'=>'User Not Found.'
        //       ],404);
        //     }
       
        $products->cat_id = $request->cat_id;
        $products->product_title = $request->product_title;
        $products->product_desc = $request->product_desc;
        $products->product_label = $request->product_label;
        $products->price = $request->price;
        $products->product_psp_price = $request->product_psp_price;
        $products->stock = $request->stock;
        $products-> product_img = 'light';
        $products-> product_images = 'light';

          
        //     // Update User
            $products->save();
            return response()->json(['message' => 'Product updated successfully']);

       
        //     // Return Json Response
        //     return response()->json([
        //         'message' => "Product successfully updated."
        //     ],200);
        // } catch (\Exception $e) {
        //     // Return Json Response
        //     return response()->json([
        //         'message' => "Something went really wrong!"
        //     ],500);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
