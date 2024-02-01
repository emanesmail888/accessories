<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CheckoutRequest;
use App\Models\Order;
use App\Models\OrderItem;
use http\Env\Response;
use App\Models\User;
use App\Models\Product;

use Illuminate\Support\Facades\Auth;



class CheckoutController extends Controller
{
    public function placeOrder(Request $request){
        $data=$request->orderItems;

        $order=new Order();
        $order->user_id=Auth::user()->id;
        $order->subtotal= $request->itemsPrice;
        $order->tax=$request->taxPrice;
        $order->total=$request->itemsPrice;
        $order->shippingPrice= $request->shippingPrice;
        $order->paymentMethod=$request->paymentMethod;

        $order->firstName=$request->shippingAddress ['firstName'];
        $order->lastName=$request->shippingAddress ['lastName'];
        $order->email=$request->shippingAddress ['email'];
        $order->mobile=$request->shippingAddress ['mobile'];
        $order->address=$request->shippingAddress ['address'];
        $order->city=$request->shippingAddress ['city'];
        $order->country=$request->shippingAddress ['country'];
        $order->zipCode=$request->shippingAddress ['zipCode'];
        $order->save();
         foreach ($request->orderItems as $item) {

            $orderItem=new OrderItem();
            $orderItem->product_id=$item['product'];
            $orderItem->order_id=$order->id;
            $orderItem->price=$item['price'];
            $orderItem->quantity=$item['qty'];
            $product=Product::find($item['product']);


           $orderItem->save();

          }
          $product->stock -= $orderItem->quantity;
          $product->save();
          $response = [
            'order' => $order,
            'id'=>$order->id,
            'email'=>$order->email,
            'itemsPrice'=>$order->total,
            'orderItems' => $orderItem,
        ];

          return response($response , 201);

       


    }
}
