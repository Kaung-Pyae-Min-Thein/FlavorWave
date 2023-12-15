<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use App\Models\Preorder;
use App\Models\PreorderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PreorderController extends Controller
{
    //get preorder detail
    public function getPreorderDetail(Request $request){

        $preorder_info = Preorder::where('id',$request->preorder_id)->first();
        $customer_info = Customer::where('id',$preorder_info->customer_id)->first();
        $preorder_item_list = PreorderItem::where('preorder_id',$request->preorder_id)
        ->get();

        return response()->json([
            'status' => 'success',
            'preorder_info' => $preorder_info,
            'customer_info' => $customer_info,
            'preorder_item_list' => $preorder_item_list,
        ], 200);
    }
}
