<?php

namespace App\Http\Controllers;

use Response;
use App\ScholarshipStudent;
use Api\Transformers\ScholarshipStudentTransformer;
use Illuminate\Http\Request;

class ScholarshipStudentController extends Controller
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
        return Response::json([
            'data' => $this->sst->transformCollection($scholarships->all())
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newScholarship = new ScholarshipStudent([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'last_payment' => $request->last_payment,
            'discount' => $request->discount,
            'min_gpa' => $request->min_gpa
        ]);
        $newScholarship->save();
        return $newScholarship;
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
            return Response::json([
                'error' => [
                    'message' => 'Scholarship student not found'
                ]
            ], 404);
        }
        else{
            return Response::json([
                'data' => $this->sst->transform($scholarship)
            ], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ScholarshipStudent  $scholarshipStudent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ScholarshipStudent $scholarshipStudent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ScholarshipStudent  $scholarshipStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(ScholarshipStudent $scholarship)
    {
        $scholarship->delete();
    }
}
