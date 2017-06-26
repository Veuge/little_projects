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
        Schema::create('regular_students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('last_name');
            $table->enum('gender',['Male', 'Female']);
            $table->date('last_payment');
            $table->date('next_payment');
            $table->integer('subjects_allowed');

            $table->primary('id');
        });

        Schema::create('scholarship_students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('last_name');
            $table->enum('gender',['Male', 'Female']);
            $table->date('last_payment');
            $table->integer('discount');
            $table->float('min_gpa');

            $table->primary('id');
        });

        Schema::create('classrooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('classroom_name');
            $table->integer('capacity');
            $table->
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->text('description');
            $table->integer('credits');
            $table->integer('classroom_id')->unsigned(  );

            $table->foreign('classroom_id')->references->('id')->on('classrooms');
            $table->primary('id');
        });

        Schema::create('regular_subjects', function(Blueprint $table){
            $table->integer('regular_id')->unsigned();
            $table->integer('subject_id')->unsigned();

            $table->primary('regular_id', 'subject_id');
        });

        Schema::create('scholarship_subjects', function(Blueprint $table){
            $table->integer('scholarship_id')->unsigned();
            $table->integer('subject_id')->unsigned();

            $table->primary('scholarship_id', 'subject_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('classrooms');
        Schema::dropIfExists('scholarship_students');
        Schema::dropIfExists('regular_students');
    }
}
