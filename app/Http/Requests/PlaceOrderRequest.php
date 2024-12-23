<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlaceOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'itemsPrice' => 'required|numeric',
            'taxPrice' => 'required|numeric',
            'shippingPrice' => 'nullable|numeric',
            'paymentMethod' => 'required|string',
            'shippingAddress.firstName' => 'required|string|max:255',
            'shippingAddress.lastName' => 'required|string|max:255',
            'shippingAddress.email' => 'required|email|max:255',
            'shippingAddress.mobile' => 'required|string|max:15',
            'shippingAddress.address' => 'required|string|max:255',
            'shippingAddress.city' => 'required|string|max:255',
            'shippingAddress.country' => 'required|string|max:255',
            'shippingAddress.zipCode' => 'required|string|max:10',
            'orderItems' => 'required|array',
            'orderItems.*.product' => 'required|exists:products,id',
            'orderItems.*.price' => 'required|numeric',
            'orderItems.*.qty' => 'required|integer|min:1',
        ];
    }
}
