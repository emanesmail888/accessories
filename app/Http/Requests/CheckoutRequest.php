<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
            'firstName'=>'required',
            'lastName'=>'required',
            'email'=>'required|email',
            'mobile'=>'required|numeric',
            'address'=>'required',
            'city'=>'required',
            'country'=>'required',
            'zipCode'=>'required|numeric',
            'paymentMethod'=>'required',



        ];
    }
}
