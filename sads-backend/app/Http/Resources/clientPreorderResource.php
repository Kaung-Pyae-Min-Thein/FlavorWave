<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class clientPreorderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'preorder_id'=>$this->preorder_id,
            'product_id'=>$this->product_id,
            'product_name'=>$this->product_name,
            'total_price'=>$this->total_price,
            'total_quantity'=>$this->total_quantity,
            'user_id'=>$this->user_id
        ];
    }
}
