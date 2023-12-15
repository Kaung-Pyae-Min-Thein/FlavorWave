<?php

namespace App\Http\Controllers\api\truck;

use Carbon\Carbon;
use App\Models\Truck;
use App\Models\OrderTruck;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\OrderTruckRequest;
use App\Http\Resources\OrderTruckResource;

class OrderTruckController extends Controller
{

    public function index(){
        $truck_list = Truck::get();
        return response()->json([
            'status' => 'success',
            'truck_list' => $truck_list,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderTruckRequest $request){
        $request->validated($request->all());
        $userId = Auth::user()->id;
        $truckId = $request->truck_id;
        $preorderIds = $request->preorder_id_list;
        foreach ($preorderIds as $preorderId) {
            $is_exist = OrderTruck::where('preorder_id',$preorderId)->first();
            if($is_exist){
                $orderTruck = OrderTruck::where('preorder_id',$preorderId)->where('truck_id',$is_exist->truck_id)->update([
                    'truck_id' => $truckId,
                    'loaded_date_time' => Carbon::now()
                ]);
            }else {
                $orderTruck = OrderTruck::create([
                    'truck_id' => $truckId,
                    'preorder_id' => $preorderId,
                    'loaded_date_time' => Carbon::now()
                ]);
            }
            // Collect the created preorder ids
            $assigned_orders[] = [
                'truck_id' => $truckId,
                'preorder_id' => $preorderId,
            ];
        }
        return response()->json([
            "status" => "assigned",
            "assigned_orders" => $assigned_orders
        ]);
        // return new OrderTruckResource($orderTruck);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderTruck $orderTruck){
        return $this->isNotAuthorized($orderTruck) ? $this->isNostAuthorized($orderTruck) : $orderTruck->delete();
    }

    public function isNotAuthorized($orderTruck){
        if(Auth::user()->id!==$orderTruck->user_id){
            return $this->error('','You are not related to this preorder',403);
        }
}
}
