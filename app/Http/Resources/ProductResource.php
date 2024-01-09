<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'cat_id' => $this->cat_id,
            'product_title' => $this->product_title,
            'product_desc' => $this->product_desc,
            'product_img' => $this->product_img,
            'product_images' => $this->product_images,
            'product_label' => $this->product_label,
            'price' => $this->price,
            'product_psp_price' => $this->product_psp_price,
            'stock' => $this->stock,
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];

           
    }
}
