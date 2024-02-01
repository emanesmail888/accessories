<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable=['user_id','product_id','rating','review'];

    public function user(){
        return $this->hasOne('App\Models\User','id','user_id');
    }
    // public function user() {
    //     return $this->belongsTo('App\Models\User');
    // }
    public function product(){
        return $this->hasOne(Product::class,'id','product_id');
    }
    public static function getAllReview(){

        return Review::with('user')->paginate(10);
}
}
