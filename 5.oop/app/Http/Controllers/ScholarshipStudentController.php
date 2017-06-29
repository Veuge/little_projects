<?php

namespace App\Http\Controllers;

use Response;
use App\ScholarshipStudent;
use Api\Transformers\ScholarshipStudentTransformer;
use Api\Transformers\SubjectTransformer;
use Illuminate\Http\Request;

class ScholarshipStudentController extends ApiController
{
    protected $scholarshipTransformer;
    protected $subjectTransformer;

    function __construct(ScholarshipStudentTransformer $transformer, SubjectTransformer $subTransformer){
        $this->scholarshipTransformer = $transformer;
        $this->subjectTransformer = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scholarships = ScholarshipStudent::all();
        if(! $scholarships){
            return $this->responseInternalError();
        }
        else{
            return $this->response([
                'data' => $this->scholarshipTransformer->transformCollection($scholarships->all())
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
        $newScholarship = new ScholarshipStudent($request->all());
        if($newScholarship->saveOrFail()){
            return $this->responseCreated("Scholarship student created successfully.");
        }
        else {
            return $this->responseInternalError();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ScholarshipStudent  $scholarshipStudent
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $scholarship = ScholarshipStudent::find($id);
        if(! $scholarship){
            return $this->responseNotFound("Scholarship student not found.");
        }
        else{
            return response([
                'data' => $this->scholarshipTransformer->transform($scholarship)
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ScholarshipStudent  $scholarshipStudent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ScholarshipStudent $scholarship)
    {
        if($scholarship->update($request->all())){
            return $this->responseUpdated("Scholarship student updated successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ScholarshipStudent  $scholarshipStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(ScholarshipStudent $scholarship)
    {
        if($scholarship->delete()){
            return $this->responseDeleted("Scholarship student deleted successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    public function subjects(ScholarshipStudent $scholarship){
        $subjects = $scholarship->subjects()->get();

        return $this->response([
            'data' => $this->subjectTransformer->transformCollection($subjects->all())
        ]);
    }
}
