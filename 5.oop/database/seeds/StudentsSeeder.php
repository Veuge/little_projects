<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\RegularStudent;
use App\ScholarshipStudent;
use App\Subject;


class StudentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('es_ES');
        $quantity = 150;

        for ($i=0; $i < $quantity; $i++) {
            $gender = $faker->randomElement($array = array ('male','female'));
            $student = new RegularStudent([
                'name' => $faker->firstName($gender),
                'last_name' => $faker->lastName,
                'gender' => $gender,
                'last_payment' => $faker->date($format = 'Y-m-d'),
                'next_payment' => $faker->date($format = 'Y-m-d'),
                'subjects_allowed' => $faker->numberBetween($min = 0, $max = 5),
                'career_id' => $faker->numberBetween($min = 1, $max = 5)
            ]);
            $student->save();
        }

        for ($i=0; $i < $quantity; $i++) {
            $gender = $faker->randomElement($array = array ('male','female'));
            $student = new ScholarshipStudent([
                'name' => $faker->firstName($gender),
                'last_name' => $faker->lastName,
                'gender' => $gender,
                'last_payment' => $faker->date($format = 'Y-m-d'),
                'discount' => $faker->numberBetween($min = 10, $max = 30),
                'min_gpa' => $faker->randomFloat($nbMaxDecimals = 2, $min = 0, $max = 5),
                'career_id' => $faker->numberBetween($min = 1, $max = 5),
            ]);
            $student->save();
        }

        // $regStudents = RegularStudent::all();
        // $subjectsIds = Subject::pluck('id')->toArray();

        // foreach ($regStudents as $regStudent) {
        //     for($i = 0; $i < $regStudent->subjects_allowed; $i++){
        //         DB::table("regular_subject")->insert([
        //             'regular_id' => $regStudent->id,
        //             'subject_id' => $faker->randomElement($subjectsIds)
        //         ]);
        //     }
        // }

        // $schStudents = ScholarshipStudent::all();
        // foreach ($schStudents as $schStudent) {
        //     for($i = 0; $i < 4; $i++){
        //         DB::table("scholarship_subject")->insert([
        //             'scholarship_id' => $schStudent->id,
        //             'subject_id' => $faker->randomElement($subjectsIds)
        //         ]);
        //     }
        // }
    }
}
