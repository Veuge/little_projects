<?php

namespace App\Http\Controllers;

use App\Classroom;
use Api\Transformers\ClassroomTransformer;
use Illuminate\Http\Request;

class ClassroomController extends ApiController
{
    protected $classroomTransformer;

    function __construct(ClassroomTransformer $transformer){
        $this->classroomTransformer = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classrooms = Classroom::all();
        if(! $classrooms){
            return $this->responseInternalError();
        }
        else{
            return $this->response([
                'data' => $this->classroomTransformer->transformCollection($classrooms->all())
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newClassroom = new Classroom($request->all());
        if($newClassroom->saveOrFail()){
            return $this->responseCreated("Classroom created successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $classroom = Classroom::find($id);
        if(! $classroom){
            return $this->responseNotFound("Classroom not found.");
        }
        else{
            return $this->response([
                'data' => $this->classroomTransformer->transform($classroom)
            ]);
        }
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
        if($classroom->update($request->all())){
            return $this->responseUpdated("Classroom updated successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function destroy(Classroom $classroom)
    {
        if($classroom->delete()){
            return $this->responseDeleted("Classroom deleted successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }
}
