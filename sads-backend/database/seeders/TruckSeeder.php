<?php

namespace Database\Seeders;

use App\Models\Truck;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TruckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'driver_name'=>'Ko Aung Kyaw',
                'license'=>'2C/9800',
                'capacity'=>'200'
            ],
            [
                'driver_name'=>'U Hla Maung',
                'license'=>'4E/2400',
                'capacity'=>'1000'
            ],
            [
                'driver_name'=>'Ko Myo Thant',
                'license'=>'5T/3100',
                'capacity'=>'600'
            ],
            [
                'driver_name'=>'U Myint Aung',
                'license'=>'1Y/1100',
                'capacity'=>'800'
            ],
            [
                'driver_name'=>'Ko Kyaw Zaw',
                'license'=>'3W/2000',
                'capacity'=>'400'
            ],
        ];
            Truck::insert($data);

    }
    }

