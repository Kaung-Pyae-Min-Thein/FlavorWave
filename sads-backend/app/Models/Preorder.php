<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preorder extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function customers(){
        return $this->belongsTo(Customer::class);
    }

    public function products(){
       return  $this->hasMany(Product::class);
    }

    public function preorderItems(){
        return $this->hasMany(PreorderItem::class);
    }

}
