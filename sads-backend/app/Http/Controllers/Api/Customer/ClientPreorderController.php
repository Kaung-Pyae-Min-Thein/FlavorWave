<?php

namespace App\Http\Controllers\Api\Customer;

use App\Models\Product;
use App\Models\Preorder;
use App\Models\PreorderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\clientPreorderRequest;
use App\Http\Resources\clientPreorderResource;

class ClientPreorderController extends Controller
{
    public function index(){
        return clientPreorderResource::collection(
            PreorderItem::where('user_id',Auth::user()->id)->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(clientPreorderRequest $request){
        $request->validated($request->all());
        $userId = Auth::user()->id;

        foreach ($request->product_list as $p) {

            $product = Product::where('id',$p['product_id'])->first();
            $box = ceil($p['order_count'] / $product->bottles_per_box);

            PreorderItem::create([
                'preorder_id' => $request->preorder_id,
                'product_id' => $p['product_id'],
                'product_name' => $p['product_name'],
                'order_count' => $p['order_count'],
                'boxes' => $box ,
                'user_id' => $userId,
            ]);
        }

        // Calculate total boxes for the preorder_items
        $totalBoxes = PreorderItem::where('preorder_id', $request->preorder_id)->sum('boxes');

        Preorder::where('id',$request->preorder_id)
        ->update([
            'total_box' => $totalBoxes,
            'total_price' => $request->total_price,
            'total_quantity' => $request->total_quantity,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'products added to order',
        ], 200);

        // return new clientPreorderResource($preOrder);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreorderItem $preorderItem){
        return $this->isNotAuthorized($preorderItem) ? $this->isNostAuthorized($preorderItem) : $preorderItem->delete();
    }

    public function isNotAuthorized($preorderItem){
        if(Auth::user()->id!==$preorderItem->user_id){
            return $this->error('','You are not related to this preorder',403);
        }
}
}
