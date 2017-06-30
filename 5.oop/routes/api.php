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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware(['cors', 'preflight'])->group(function(){
    Route::resource('regulars', 'RegularStudentController', ['except' => ['create', 'edit']]);
    Route::get('regulars/{regular}/subjects', 'RegularStudentController@subjects');

    Route::resource('scholarships', 'ScholarshipStudentController', ['except' => ['create', 'edit']]);
    Route::get('scholarships/{scholarship}/subjects', 'ScholarshipStudentController@subjects');

    Route::resource('subjects', 'SubjectController', ['except' => ['create', 'edit']]);
    Route::get('subjects/{subject}/students', 'SubjectController@students');
    Route::get('subjects/{subject}/classrooms', 'SubjectController@classrooms');

    Route::resource('classrooms', 'ClassroomController', ['except' => ['create', 'edit']]);
    Route::get('classrooms/{classroom}/subjects', 'ClassroomController@subjects');
// });
