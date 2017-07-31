<?php

namespace App\Http\Controllers;

use Response;
use App\ScholarshipStudent;
use App\Subject;
use Api\Transformers\ScholarshipStudentTransformer;
use Api\Transformers\SubjectTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ScholarshipSubjectController extends ApiController
{
    protected $scholarshipTransformer;
    protected $subjectTransformer;

    function __construct(ScholarshipStudentTransformer $schTransformer, SubjectTransformer $subTransformer){
        $this->scholarshipTransformer = $schTransformer;
        $this->subjectTransformer = $subTransformer;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ScholarshipStudent $scholarship, Subject $subject){
        $subjects = $scholarship->subjects()->get();

        return $this->response([
            'data' => $this->subjectTransformer->transformCollection($subjects->all())
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ScholarshipStudent $scholarship, Request $request){
        $subjectIds = $request->all();

        $scholarship->subjects()->attach($subjectIds);

        return $this->responseCreated('Subject(s) added to the student');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ScholarshipStudent $scholarship, $id){
        $scholarship->subjects()->detach($id);

        return $this->responseDeleted("Subject deleted successfully from student");
    }
}
