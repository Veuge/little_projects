<?php

namespace App\Http\Controllers;

use Response;
use App\ScholarshipStudent;
use Api\Transformers\ScholarshipStudentTransformer;
use Api\Transformers\SubjectTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ScholarshipController extends ApiController
{
    protected $scholarshipTransformer;
    protected $subjectTransformer;

    function __construct(ScholarshipStudentTransformer $transformer, SubjectTransformer $subTransformer){
        $this->scholarshipTransformer = $transformer;
        $this->subjectTransformer = $subTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limit = Input::get("limit") ?: 100 ;
        $scholarships = ScholarshipStudent::paginate($limit);

        $nested = Input::get("nested") ?: false;
        
        if(! $scholarships){
            return $this->responseInternalError();
        }
        else{
            if($nested){
                for($i = 0; $i < count($scholarships); $i ++){
                    $scholarship = $scholarships[$i];

                    $subjects = $scholarship->subjects()->get();
                    if($subjects){
                        $scholarship['subjects_enrolled'] = $subjects;
                        $scholarships[$i] = $scholarship;
                    }
                }                
            }

            return $this->responseWithPagination($scholarships, [
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
                'data' => [
                    $this->scholarshipTransformer->transform($scholarship)
                ]
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
