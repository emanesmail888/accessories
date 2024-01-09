<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Support\Authorization\AuthorizationUserTrait;


class UpdateProductRequest extends FormRequest
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
        return[
            // 'cat_id' =>'nullable',
            // 'product_title' => 'string|max:55',
            // 'product_desc' => 'string',
            // 'product_img' => 'image|nullable',
            // 'product_images.*' =>'nullable|array|image|mimes:jpeg,png,jpg,gif|max:2048', // Example validation rule for images
            // 'product_label' => 'string|nullable',
            // 'price' =>'numeric',
            // 'product_psp_price' =>'numeric|nullable',
            // 'stock' =>'numeric',

            'cat_id' => 'required',
            'product_title' =>  'required|string|max:55',
            'product_desc' =>  'required|string',
            'product_img' =>  '',
            'product_images' =>'',
            'product_label' =>  'required|string',
            'price' =>'required',
            'product_psp_price' => 'required',
            'stock' => 'required'

        ];
    }
}
