<?php

namespace App\Http\Controllers;

use Response;
use App\Subject;
use Api\Transformers\SubjectTransformer;
use Api\Transformers\RegularStudentTransformer;
use Api\Transformers\ScholarshipStudentTransformer;
use Illuminate\Http\Request;

class SubjectController extends ApiController
{
    protected $subjectTransformer;
    protected $regularTransformer;
    protected $scholarshipTransformer;

    function __construct(SubjectTransformer $subTransformer, RegularStudentTransformer $regTransformer, ScholarshipStudentTransformer $schTransformer){
        $this->subjectTransformer = $subTransformer;
        $this->regularTransformer = $regTransformer;
        $this->scholarshipTransformer = $schTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::all();

        if(! $subjects){
            return $this->responseInternalError();
        }
        else {
            return $this->response([
                'data' => $this->subjectTransformer->transformCollection($subjects->all())
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
        $newSubject = new Subject($request->all());
        if($newSubject->saveOrFail()){
            return $this->responseCreated("Subject created successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $subject = Subject::find($id);

        if(! $subject){
            return $this->responseNotFound("Subject not found.");
        }
        else {
            return $this->response([
                'data' => [
                    $this->subjectTransformer->transform($subject)
                ]
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subject $subject)
    {
        if($subject->update($request->all())){
            return $this->responseUpdated("Subject updated successfully.");
        }
        else {
            return $this->responseInternalError();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subject $subject)
    {
        if($subject->delete()){
            return $this->responseDeleted("Subject deleted successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    public function students(Subject $subject){
        $regulars = $subject->regulars()->get();
        $scholarships = $subject->scholarships()->get();

        $all = $regulars->merge($scholarships);
        // return $all;

        // TODO: join the two collections in one!

        return $this->response([
            'data' => $all
        ]);
    }

    public function classrooms(Subject $subject){
        $classrooms = $subject->classrooms()->get();

        return $this->response([
            'data' => $this->subjectTransformer->transformCollection($classrooms->all())
        ]);
    }
}
