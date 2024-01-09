<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'cat_id' => 'required',
            'product_title' =>  'required|string|max:55',
            'product_desc' =>  'required|string',
            'product_img' =>  '',
            'product_images' =>'',
            'product_label' =>  'required|string',
            'price' =>'required',
            'product_psp_price' => 'required',
            'stock' => 'required',

        ];
    }
}
