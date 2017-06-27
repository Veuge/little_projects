<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Classroom;

class ClassroomsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create("es_ES");
        $quantity = 5;

        for($i = 0; $i < $quantity; $i++){
            $classroom = new Classroom([
                'classroom_name' => $faker->numerify('Classroom-###'),
                'capacity' => $faker->numberBetween($min = 30, $max = 70),
            ]);
            $classroom->save();
        }
    }
}

// 'facilities' => $faker->randomElements($array = array ('Computer','Projector','Microphone', 'Sound', 'Webcam', 'Internet'), $count = 3)
