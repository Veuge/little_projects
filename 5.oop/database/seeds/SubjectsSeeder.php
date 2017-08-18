<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Subject;
use App\Schedule;

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
        $quantity = 30;

        for($i = 0; $i < $quantity; $i++){
            $prefix = $faker->randomElement($array = array ('INF','MAT','EST', 'ADM', 'GST'));
            $version = $faker->numberBetween($min = 101, $max = 200);
            $subject = new Subject([
                'name' => $prefix . "-" . $version,
                'description' => $faker->sentence(10, true),
                'credits' => $faker->numberBetween(5, 10),
                'classroom_id' => $faker->numberBetween(1, 5),
                'career_id' => $faker->numberBetween(1, 5)
            ]);
            $subject->save();
        }

        for($i = 0; $i < 10; $i ++){
            do{
                $start = $faker->time($format = 'H');
            }
            while($start < 7 || $start > 12);

            $schedule = new Schedule([
                'day' => $faker->randomElement($array = array ('Monday','Tuesday','Wednesday','Thursday','Friday')),
                'start' => $start
            ]);
            $schedule->save();
        }

        for($i = 0; $i < 10; $i ++){
            do{
                $start = $faker->time($format = 'H');
            }
            while($start < 13 || $start > 18);

            $schedule = new Schedule([
                'day' => $faker->randomElement($array = array ('Monday','Tuesday','Wednesday','Thursday','Friday')),
                'start' => $start
            ]);
            $schedule->save();
        }

        for($i = 0; $i < 10; $i ++){
            do{
                $start = $faker->time($format = 'H');
            }
            while($start < 19 || $start > 23);

            $schedule = new Schedule([
                'day' => $faker->randomElement($array = array ('Monday','Tuesday','Wednesday','Thursday','Friday')),
                'start' => $start
            ]);
            $schedule->save();
        }

        $subjects = Subject::all();

        foreach ($subjects as $subject) {
            for ($i = 0; $i < 3; $i++) {
                $min = $i * 10 + 1;
                $max = ($i + 1) * 10;
                for($j = 0; $j < $faker->numberBetween(1, 2); $j++){
                    DB::table("schedule_subject")->insert([
                        'subject_id' => $subject->id,
                        'schedule_id' => $faker->numberBetween($min, $max)
                    ]);
                }
            }
        }
    }
}
