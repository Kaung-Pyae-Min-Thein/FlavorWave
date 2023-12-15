<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use App\Models\Preorder;
use App\Models\PreorderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class FilterController extends Controller
{
    //filter by calendar and list type
    public function calendarControl(Request $request){
        // Validation rules
        $rules = [
            'dept' => 'required|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ];

        // Validate the request data
        $validator = Validator::make($request->all(), $rules);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $dept = $request->dept;
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        $filtered_data = Customer::select('customers.*','customers.region as customer_region','customers.name as customer_name','preorders.preorder_number','preorders.total_quantity','preorders.total_price','preorders.status')
            ->leftJoin('preorders','customers.id','preorders.customer_id')
            ->whereBetween('preorders.created_at', [$startDate, $endDate])->get();


        return response()->json([
            'dept' => $request->dept,
            'filtered_data' => $filtered_data,
        ], 200);

    }
}
