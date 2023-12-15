<?php

namespace App\Http\Resources;

use App\Models\Preorder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'preorder_id' => $this->preorder_id,
            'name'=>$this->name,
            'region'=>$this->region,
            'address'=>$this->address,
            'phone_number'=>$this->phone_number,

        ];
    }
}
