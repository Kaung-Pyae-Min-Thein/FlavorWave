<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProduct()
    {
        $product_list = Product::when(request('searchKey'), function ($query, $searchKey) {
            return $query->where('product_name', 'LIKE', '%' . request('searchKey') . '%');
        })->paginate(6)->withQueryString();

        return response()->json(
            [
                'status' => 'success',
                'product_list' => $product_list,
            ], 200);
    }


}
