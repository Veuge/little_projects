<?php

namespace App\Http\Controllers;

use App\Classroom;
use Api\ClassroomFormatter;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    protected $classroomFormatter;

    public function __construct(ClassroomFormatter $classFormatter){
        $this->classroomFormatter = $classFormatter;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Classroom::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newClassroom = new Classroom([
            'classroom_name' => $request->classroom_name,
            'capacity' => $request->capacity
        ]);

        $newClassroom->save();
        return $newClassroom;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show(Classroom $classroom)
    {
        return $classroom;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Classroom $classroom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function destroy(Classroom $classroom)
    {
        $classroom->delete();
    }
}
