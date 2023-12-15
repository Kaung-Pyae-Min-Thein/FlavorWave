<?php

namespace App\Http\Controllers\Api\status;

use Carbon\Carbon;
use App\Models\Preorder;
use Illuminate\Http\Request;
use App\Models\PreorderStatus;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PreorderStatusRequest;
use App\Http\Resources\PreorderStatusResource;

class PreOrderstatusController extends Controller
{
    public function index(){
        return PreOrderstatusController::collection(
            PreorderStatus::where('user_id',Auth::user()->id)->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PreorderStatusRequest $request){
        $request->validated($request->all());
        $userId = Auth::user()->id;
        $user_role = Auth::user()->role;

        if($user_role === 'logistic' || $user_role === 'warehouse' || $user_role === 'sales'){
            $preOrderstatus=PreorderStatus::create([
                'preorder_id'=>$request->preorder_id,
                'status'=>$request->status,
                'user_id'=>$userId,
                'updated_at'=>Carbon::now()
            ]);

            Preorder::where('id',$request->preorder_id)->update([
                'status' => $request->status,
            ]);


            return new PreorderStatusResource($preOrderstatus);
        }else {
            return response()->json([
                'status' => 'unauthorized',
                'message' => "You don't have permission for this",
            ], 200);
        }

    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreorderStatus $preorderStatus){
        return $this->isNotAuthorized($preorderStatus) ? $this->isNostAuthorized($preorder) : $preorder->delete();
    }

    public function isNotAuthorized($preorderStatus){
        if(Auth::user()->id!==$preorderStatus->user_id){
            return $this->error('','You are not related to this preorder',403);
        }
}
}
