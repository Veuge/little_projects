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
                'name' => 'Ingenieria Ambiental', 
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Ingenieria Comercial', 
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Ingenieria de Sistemas', 
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Administración de Empresas', 
                'description' => $faker->realText($maxNbChars = 200)
            ),
            array(
                'name' => 'Gastronomía', 
                'description' => $faker->realText($maxNbChars = 200)
            )
        );
        DB::table('careers')->insert($careers);
    }
}
