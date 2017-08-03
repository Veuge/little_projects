<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Career;

class CareersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('es_ES');

        DB::table('careers')->delete();
        $careers = array(
            array(
                'name' => 'Business Administration',
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Systems Engineering',
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Computer Science',
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Electrical Engineering',
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Materials Science', 
                'description' => $faker->realText($maxNbChars = 200)
            )
        );
        DB::table('careers')->insert($careers);
    }
}
