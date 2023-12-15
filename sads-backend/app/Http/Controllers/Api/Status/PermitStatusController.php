<?php

namespace App\Http\Controllers\api\status;

use App\Models\Preorder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PermitStatusController extends Controller
{
    public function changePermitStatus(Request $request){
        $user_role = Auth::user()->role;
        if($user_role === 'sales'){
            Preorder::where('id',$request->preorder_id)
            ->update([
                'permit_status' => $request->permit_status,
            ]);
            return response()->json([
                'status' => 'success',
                'message' => "Your status changed to " . $request->permit_status,
            ], 200);
        }else {
            return response()->json([
                'status' => 'unauthorized',
                'message' => "You don't have permission for this",
            ], 200);
        }
    }
}
