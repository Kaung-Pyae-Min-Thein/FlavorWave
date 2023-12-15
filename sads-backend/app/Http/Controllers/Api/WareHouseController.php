<?php

namespace App\Http\Controllers\api;

use App\Models\Preorder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WareHouseController extends Controller
{
    public function index(){
        $preorder_data = Preorder::select('preorders.*','customers.name as customer_name','customers.region as customer_region','customers.address as customer_address')
        ->leftJoin('customers','preorders.customer_id','customers.id')
        ->orderBy('preorders.id')
        ->get();

        return response()->json([
         'status' => 'success',
         'preorder_data' => $preorder_data
        ], 200);
     }
}
