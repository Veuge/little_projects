<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ClassroomsSeeder::class);
        $this->call(SubjectsSeeder::class);
        $this->call(StudentsSeeder::class);
    }
}
