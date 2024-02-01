<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('cat_id')->unsigned()->nullable();
            $table->string('product_title');
            $table->text('product_desc');
            $table->string('product_img')->nullable();
            $table->text('product_images')->nullable();
            $table->text('product_label')->nullable();
            $table->decimal('price');
            $table->decimal('product_psp_price')->nullable();
            $table->unsignedInteger('stock')->default(10);
            $table->tinyInteger('new_arrival')->default('0')->nullable();
            $table->timestamps();
            $table->foreign('cat_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
