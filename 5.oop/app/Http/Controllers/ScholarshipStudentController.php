<?php

namespace App\Http\Controllers;

use Response;
use App\ScholarshipStudent;
use Api\Transformers\ScholarshipStudentTransformer;
use Illuminate\Http\Request;

class ScholarshipStudentController extends ApiController
{
    protected $sst;

    function __construct(ScholarshipStudentTransformer $transformer){
        $this->sst = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scholarships = ScholarshipStudent::all();
        return $this->response([
            'data' => $this->sst->transformCollection($scholarships->all())
        ]);
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
        $newScholarship->saveOrFail();

        return $this->responseCreated("Scholarship student created successfully.");
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
                'data' => $this->sst->transform($scholarship)
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
        $scholarship->update($request->all());

        return $this->responseUpdated("Scholarship student updated successfully.");
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
    }
}
