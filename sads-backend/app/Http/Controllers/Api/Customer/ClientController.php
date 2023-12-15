<?php

namespace App\Http\Controllers\Api\Customer;

use App\Models\Customer;
use App\Models\Preorder;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ClientResource;

class ClientController extends Controller
{
    public function index(){
        return ClientResource::collection(
            Customer::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientRequest $request){
        $request->validated($request->all());
        $userId = Auth::user()->id;
        $customer=Customer::create([
            'name'=>$request->name,
            'region'=>$request->region,
            'address'=>$request->address,
            'phone_number'=>$request->phone_number,
        ]);



        $preorder = Preorder::create([
            'customer_id' => $customer->id,
            'preorder_number' => rand(10000,99999),
            'status' => 'pending',
            'user_id' => $userId,
        ]);

        return response()->json([
            'preorder_id' => $preorder->id,
            'customer_infor' => $customer,
        ], 200);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer){
        return $this->isNotAuthorized($customer) ? $this->isNostAuthorized($customer) : $customer->delete();
    }

    public function isNotAuthorized($customer){
        if(Auth::user()->id!==$customer->user_id){
            return $this->error('','You are not related to this preorder',403);
        }
}
}
