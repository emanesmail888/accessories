<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\PlaceOrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;






class CheckoutController extends Controller
{
   
    public function placeOrder(PlaceOrderRequest $request) :Response
    {

        // Create a new order
        $order = new Order();
        $order->user_id = Auth::user()->id;
        $order->subtotal = $request->itemsPrice;
        $order->tax = $request->taxPrice;
        $order->total = $request->itemsPrice + $request->taxPrice;
        $order->shippingPrice = $request->shippingPrice;
        $order->paymentMethod = $request->paymentMethod;
        $order->firstName = $request->shippingAddress['firstName'];
        $order->lastName = $request->shippingAddress['lastName'];
        $order->email = $request->shippingAddress['email'];
        $order->mobile = $request->shippingAddress['mobile'];
        $order->address = $request->shippingAddress['address'];
        $order->city = $request->shippingAddress['city'];
        $order->country = $request->shippingAddress['country'];
        $order->zipCode = $request->shippingAddress['zipCode'];
        $order->save();

        // Process order items
        foreach ($request->orderItems as $item) {
            $orderItem = new OrderItem();
            $orderItem->product_id = $item['product'];
            $orderItem->order_id = $order->id;
            $orderItem->price = $item['price'];
            $orderItem->quantity = $item['qty'];
            $orderItem->save();

            // Update product stock
            $product = Product::find($item['product']);
            if ($product) {
                $product->stock -= $orderItem->quantity;
                $product->save();
            }
        }

        // Prepare and return response
        $response = [
            'order' => $order,
            'id' => $order->id,
            'email' => $order->email,
            'itemsPrice' => $order->total,
            'orderItems' => $request->orderItems,
        ];

        return response($response, 201);
    }

     //get the details of an order
     public function order_details($id): JsonResponse
     {
         $order = Order::where('id', $id)->get();
         $order_items =DB::table('order_items')->where('order_id','=',$id)->leftJoin('products', 'order_items.product_id', '=',  'products.id')->get();
         return response()->json([$order,$order_items]);
     }
 


      // update order status to paid
      public function updateOrderToPaid($id): JsonResponse
      {
          $order = Order::findOrFail($id);
  
          if ($order) {
              $order->isPaid = true;
              $order->paidAt = now()->format('Y-m-d');
              $order->save();
              return response()->json([$order]);
          }
  
          return response()->json(['message' => 'Order not found'], 404);
      }
  
  
      //admin update order status to delivered
      public function updateOrderToDelivered($id): JsonResponse
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
  
      //display orders of logged in user
      public function userOrders(): JsonResponse
      {
          $user_id = Auth::user()->id;
          $order = Order::where('user_id', $user_id)->get();
          if ($order) {
              return response()->json([$order]);
          }
          return response()->json(['message' => 'Order not found'], 404);
      }
  
  
      //display all orders by Admin
      public function allOrders(): JsonResponse
      {
          $order = Order::cursor();
          if ($order) {
              return response()->json([$order]);
          }
          return response()->json(['message' => 'Orders not found'], 404);
      }
  
  
      //cancel and delete order by user
      public function deleteOrder($id): Response
      {
          $order=Order::where([['id','=' , $id] ,['user_id', '=' , Auth::user()->id]])->delete();
          return response("", 204);
      }

}
