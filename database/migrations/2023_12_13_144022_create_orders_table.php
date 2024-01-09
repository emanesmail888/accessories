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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->decimal('shippingPrice')->nullable();
            $table->decimal('discount')->default(0);
            $table->decimal('tax')->nullable();
            $table->decimal('subtotal')->nullable();
            $table->decimal('total')->nullable();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('mobile');
            $table->string('email');
            $table->string('address');
            $table->string('city');
            $table->string('country');
            $table->string('zipCode');
            $table->string('paymentMethod')->nullable();
            $table->boolean('isPaid')->default(false);
            $table->boolean('isDeliver')->default(false);
            $table->date('deliveredAt')->nullable();
            $table->date('paidAt')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
