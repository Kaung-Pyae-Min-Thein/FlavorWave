<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderTruckResource extends JsonResource
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
            'truck_id'=>$this->truck_id,
            'preorder_id'=>$this->preorder_id,
            'loaded_date_time'=>$this->loaded_date_time,
        ];
    }
}
