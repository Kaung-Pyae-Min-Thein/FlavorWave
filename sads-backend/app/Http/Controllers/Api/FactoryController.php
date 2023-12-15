<?php

namespace App\Http\Controllers\api;

use App\Models\Preorder;
use App\Models\ProductRaw;
use App\Models\PreorderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class FactoryController extends Controller
{
    public function getRawList(Request $request){

        $preorder_raw_totals = DB::table('preorder_items')
        ->select(
            // 'preorder_items.preorder_id',
            'raws.material_name',
            'product_raws.raw_id',
            DB::raw('SUM(product_raws.amount) as raw_amount')
        )
        ->leftJoin('products', 'preorder_items.product_id', '=', 'products.id')
        ->leftJoin('product_raws', 'products.id', '=', 'product_raws.product_id')
        ->leftJoin('raws','product_raws.raw_id','raws.id')
        ->where('preorder_items.preorder_id',$request->preorder_id)
        ->groupBy('preorder_items.preorder_id','product_raws.raw_id','raws.material_name')
        ->get();


        $data = $preorder_raw_totals;



        return response()->json([
            'data' => $data,
            // 'total_boxes' => $total_boxes,
        ], 200);

    }

    public function getFactoryData(){

        $preorder_data = Preorder::select('preorders.*','customers.name as customer_name','customers.region as customer_region','customers.address as customer_address')
        ->leftJoin('customers','preorders.customer_id','customers.id')
        ->orderBy('preorders.id')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $preorder_data,
        ], 200);
    }
}
