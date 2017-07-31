<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
| 
*/

Route::resource('careers', 'CareerController', ['except' => ['create', 'edit']]);

Route::resource('regulars', 'RegularController', ['except' => ['create', 'edit']]);
Route::resource('regulars/{regular}/subjects', 'RegularSubjectController', ['only' => ['index', 'store', 'destroy']]);

Route::resource('scholarships', 'ScholarshipController', ['except' => ['create', 'edit']]);
Route::resource('scholarships/{scholarship}/subjects', 'ScholarshipSubjectController', ['only' => ['index', 'store', 'destroy']]);

Route::resource('subjects', 'SubjectController', ['except' => ['create', 'edit']]);
Route::get('subjects/{subject}/students', 'SubjectController@students');
Route::get('subjects/{subject}/classrooms', 'SubjectController@classrooms');

Route::resource('classrooms', 'ClassroomController', ['except' => ['create', 'edit']]);
Route::get('classrooms/{classroom}/subjects', 'ClassroomController@subjects');
