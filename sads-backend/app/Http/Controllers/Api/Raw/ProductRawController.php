<?php

namespace App\Http\Controllers\api\raw;

use App\Http\Requests\ProductRawRequest;
use App\Models\ProductRaw;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductRawResource;

class ProductRawController extends Controller
{
    public function index(){
        return ProductRawResource::collection(
            ProductRaw::where('user_id',Auth::user()->id)->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRawRequest $request){
        $request->validated($request->all());
        $userId = Auth::user()->id;

        $productRaw=ProductRawController::create([
            'product_id'=>$request->product_id,
            'raw_id'=>$request->raw_id,
            'amount'=>$request->amount
        ]);

        return new ProductRawResource($productRaw);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductRaw $productRaw){
        return $this->isNotAuthorized($productRaw) ? $this->isNostAuthorized($preorderStatus) : $preorder->delete();
    }

    public function isNotAuthorized($productRaw){
        if(Auth::user()->id!==$productRaw->user_id){
            return $this->error('','You are not related to this preorder',403);
        }
}
}
