<?php

use App\Models\Customer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('preorders', function (Blueprint $table) {
            $table->id();
            $table->integer('customer_id');
            $table->integer('preorder_number')->unique();
            $table->String('status')->default('pending');
            $table->integer('user_id');
            $table->String('permit_status')->default('pending');
            $table->integer('total_box')->default(0);
            $table->integer('total_price')->default(0);
            $table->integer('total_quantity')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preorders');
    }
};
