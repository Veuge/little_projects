<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRegularStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('careers', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->text('description');
        });

        Schema::create('regular_students', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('career_id')->unsigned();

            $table->string('name');
            $table->string('last_name');
            $table->enum('gender',['male', 'female']);
            $table->date('last_payment');
            $table->date('next_payment');
            $table->integer('subjects_allowed');

            $table->foreign('career_id')->references('id')->on('careers');
        });

        Schema::create('scholarship_students', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('career_id')->unsigned()->default(1);

            $table->string('name');
            $table->string('last_name');
            $table->enum('gender',['Male', 'Female']);
            $table->date('last_payment');
            $table->integer('discount');
            $table->float('min_gpa');

            $table->foreign('career_id')->references('id')->on('careers');
        });

        Schema::create('classrooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('classroom_name');
            $table->integer('capacity');
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('description');
            $table->integer('credits');
            $table->integer('classroom_id')->unsigned();
            $table->integer('career_id')->unsigned();

            $table->foreign('classroom_id')->references('id')->on('classrooms');
            $table->foreign('career_id')->references('id')->on('careers');
        });

        Schema::create('scholarship_subject', function(Blueprint $table){
            $table->increments('id');
            $table->integer('scholarship_id')->unsigned();
            $table->integer('subject_id')->unsigned();

            $table->foreign('scholarship_id')->references('id')->on('scholarship_students')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
        });

        Schema::create('schedules', function(Blueprint $table){
            $table->increments('id');
            $table->enum('day', ['Monday','Tuesday','Wednesday','Thursday','Friday']);
            $table->integer('start');
        });

        Schema::create('schedule_subject', function(Blueprint $table){
            $table->increments('id');
            $table->integer('schedule_id')->unsigned();
            $table->integer('subject_id')->unsigned();

            $table->foreign('schedule_id')->references('id')->on('schedules');
            $table->foreign('subject_id')->references('id')->on('subjects');
        });

        Schema::create('regular_schedule_subject', function(Blueprint $table){
            $table->increments('id');
            $table->integer('regular_id')->unsigned();
            $table->integer('subject_id')->unsigned();
            $table->integer('schedule_id')->unsigned();

            $table->foreign('regular_id')->references('id')->on('regular_students')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
            $table->foreign('schedule_id')->references('id')->on('schedules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('regular_schedule_subject');
        Schema::dropIfExists('schedule_subject');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('scholarship_subject');
        Schema::dropIfExists('regular_students');
        Schema::dropIfExists('scholarship_students');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('classrooms');
        Schema::dropIfExists('careers');
    }
}
