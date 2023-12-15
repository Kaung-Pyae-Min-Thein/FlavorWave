<?php

namespace Database\Seeders;

use App\Models\Raw;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RawSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $raws = [
            [
                'material_name'=>'Black tea leaves'
            ],
            [
                'meaterail_name'=>"Lemongrass"
            ],
            [
                'material_name'=>'Ginger'
            ],
            [
                'material_name'=>'Rose Petalss'
            ],
            [
                'material_name'=>'Green tea leaves'
            ],
            [
                "material_name"=>'Orange juice'
            ],
            [
                'material_name'=>'Coconut milk'
            ],
            [
                'material_name'=>'Jasmine tea leaves'
            ],
            [
                'material_name'=>'Papaya puree'
            ],
            [
                'material_name'=>'Lychee puree'
            ],
            [
                'material_name'=>'Pineapple juice'
            ],];

            Raw::insert($raws);

    }
}
