<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Subject;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('es_ES');
        $quantity = 9;

        for($i = 0; $i < $quantity; $i++){
            $prefix = $faker->randomElement($array = array ('INF','MAT','EST'));
            $version = $faker->numberBetween($min = 101, $max = 200);
            $subject = new Subject([
                'name' => $prefix . "-" . $version,
                'description' => $faker->sentence(10, true),
                'credits' => $faker->numberBetween(5, 10),
                'classroom_id' => $faker->numberBetween(1, 5)
            ]);
            $subject->save();
        }
    }
}
