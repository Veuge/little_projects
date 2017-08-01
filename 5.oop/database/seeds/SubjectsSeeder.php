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

        for($i = 0; $i < 20; $i ++){
            $schedule = new Schedule([
                'day' => $faker->randomElement($array = array ('Monday','Tuesday','Wednesday','Thursday','Friday')),
                'start' => $faker->time($format = 'H')
            ]);
            $schedule->save();
        }

        $subjects = Subject::all();
        $scheduleIds = Schedule::pluck('id')->toArray();

        foreach ($subjects as $subject) {
            for($i = 0; $i < $faker->numberBetween($min = 1, $max = 5); $i++){
                DB::table("schedule_subject")->insert([
                    'subject_id' => $subject->id,
                    'schedule_id' => $faker->randomElement($scheduleIds)
                ]);
            }
        }
    }
}
