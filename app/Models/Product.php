<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = "products";
    protected $fillable = [
        'cat_id',
        'product_title',
        'product_desc',
        'product_img',
        'product_images',
        'product_label',
        'price',
        'product_psp_price',
        'stock',
    ];

}
