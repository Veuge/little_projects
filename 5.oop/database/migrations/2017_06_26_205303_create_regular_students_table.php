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
        Schema::create('regular_students', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('last_name');
            $table->enum('gender',['male', 'female']);
            $table->date('last_payment');
            $table->date('next_payment');
            $table->integer('subjects_allowed');
        });

        Schema::create('scholarship_students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('last_name');
            $table->enum('gender',['Male', 'Female']);
            $table->date('last_payment');
            $table->integer('discount');
            $table->float('min_gpa');
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

            $table->foreign('classroom_id')->references('id')->on('classrooms')->onDelete('cascade');
        });

        Schema::create('regular_subjects', function(Blueprint $table){
            $table->increments('id');
            $table->integer('regular_id')->unsigned();
            $table->integer('subject_id')->unsigned();

            $table->foreign('regular_id')->references('id')->on('regular_students')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
        });

        Schema::create('scholarship_subjects', function(Blueprint $table){
            $table->increments('id');
            $table->integer('scholarship_id')->unsigned();
            $table->integer('subject_id')->unsigned();

            $table->foreign('scholarship_id')->references('id')->on('scholarship_students')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
        });

        Schema::create('careers', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->text('description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('regular_subjects');
        Schema::dropIfExists('scholarship_subjects');
        Schema::dropIfExists('regular_students');
        Schema::dropIfExists('scholarship_students');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('classrooms');
        Schema::dropIfExists('careers');
    }
}
