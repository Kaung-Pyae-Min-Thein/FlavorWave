<?php

namespace App\Http\Controllers\api;

use App\Models\Preorder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PreorderItem;

class LogisticPReorderController extends Controller
{
    public function index(){
        $preorder_data = Preorder::select(
            'preorders.*',
            'customers.name as customer_name',
            'customers.region as customer_region',
            'customers.address as customer_address',
            'trucks.license'
        )
        ->leftJoin('order_trucks', 'preorders.id', '=', 'order_trucks.preorder_id')
        ->leftJoin('trucks', 'order_trucks.truck_id', '=', 'trucks.id')
        ->leftJoin('customers', 'preorders.customer_id', '=', 'customers.id')
        ->get();
        return response()->json([
         'status' => 'success',
         'preorder_data' => $preorder_data,
        ], 200);
     }
}
