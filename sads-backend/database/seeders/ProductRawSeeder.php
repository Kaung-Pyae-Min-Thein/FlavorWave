<?php

namespace Database\Seeders;

use App\Models\ProductRaw;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductRawSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $product_raws = [
            [
                'product_id' => 1,
                'raw_id' => 1,
                'amount' => 150,
            ],
            [
                'product_id' => 1,
                'raw_id' => 2,
                'amount' => 200,
            ],
            [
                'product_id' => 1,
                'raw_id' => 3,
                'amount' => 300,
            ],
            [
                'product_id' => 2,
                'raw_id' => 4,
                'amount' => 600,
            ],
            [
                'product_id' => 2,
                'raw_id' => 5,
                'amount' => 200,
            ],
            [
                'product_id' => 2,
                'raw_id' => 6,
                'amount' => 550,
            ],
            [
                'product_id' => 3,
                'raw_id' => 5,
                'amount' => 800,
            ],
            [
                'product_id' => 3,
                'raw_id' => 8,
                'amount' => 200,
            ],
            [
                'product_id' => 3,
                'raw_id' => 7,
                'amount' => 400,
            ],
            [
                'product_id' => 4,
                'raw_id' => 2,
                'amount' => 700,
            ],
            [
                'product_id' => 4,
                'raw_id' => 10,
                'amount' => 300,
            ],
            [
                'product_id' => 5,
                'raw_id' => 10,
                'amount' => 320,
            ],
            [
                'product_id' => 5,
                'raw_id' => 1,
                'amount' => 400,
            ],
            [
                'product_id' => 5,
                'raw_id' => 8,
                'amount' => 380,
            ],
            [
                'product_id' => 6,
                'raw_id' => 4,
                'amount' => 600,
            ],
            [
                'product_id' => 6,
                'raw_id' => 3,
                'amount' => 760,
            ],
            [
                'product_id' => 7,
                'raw_id' => 6,
                'amount' => 700,
            ],
            [
                'product_id' => 7,
                'raw_id' => 1,
                'amount' => 960,
            ],
            [
                'product_id' => 7,
                'raw_id' => 9,
                'amount' => 460,
            ],
            [
                'product_id' => 8,
                'raw_id' => 4,
                'amount' => 730,
            ],
            [
                'product_id' => 8,
                'raw_id' => 2,
                'amount' => 435,
            ],
            [
                'product_id' => 9,
                'raw_id' => 5,
                'amount' => 860,
            ],
            [
                'product_id' => 9,
                'raw_id' => 2,
                'amount' => 456,
            ],
            [
                'product_id' => 9,
                'raw_id' => 11,
                'amount' => 768,
            ],
            [
                'product_id' => 10,
                'raw_id' => 5,
                'amount' => 340,
            ],
            [
                'product_id' => 10,
                'raw_id' => 8,
                'amount' => 450,
            ],

        ];
        ProductRaw::insert($product_raws);
    }
}
