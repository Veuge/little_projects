<?php

namespace App\Http\Controllers;

use Response;
use App\RegularStudent;
use App\Subject;
use Api\Transformers\RegularStudentTransformer;
use Api\Transformers\SubjectTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class RegularSubjectController extends ApiController
{
    protected $regularTransformer;
    protected $subjectTransformer;

    function __construct(RegularStudentTransformer $regTransformer, SubjectTransformer $subTransformer){
        $this->regularTransformer = $regTransformer;
        $this->subjectTransformer = $subTransformer;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RegularStudent $regular, Subject $subject){
        $subjects = $regular->subjects()->get();

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
    public function store(RegularStudent $regular, Request $request){
        /**
        *   Expected request:
        *   [
        *       { subject_id: 1, schedule_id: 2 },
        *       { subject_id: 2, schedule_id: 3 }
        *   ]
        */
        
        $request = $request->all();
        $counter = count($request);

        for($i = 0; $i < $counter; $i++){
            $current = $request[$i];
            $regular->subjects()->attach([
                $current["subject_id"] => ['schedule_id' => $current["schedule_id"]]
            ]);
        }

        return $this->responseCreated('Subject(s) added to the student');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegularStudent $regular, $id){
        $regular->subjects()->detach($id);

        return $this->responseDeleted("Subject deleted successfully from student");
    }
}
