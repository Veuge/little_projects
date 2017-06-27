<?php

namespace App\Http\Controllers;

use App\ScholarshipStudent;
use Api\ScholarshipStudentFormatter;
use Illuminate\Http\Request;

class ScholarshipStudentController extends Controller
{
    protected $scholarshipFormatter;

    public function __construct(ScholarshipStudentFormatter $schFormatter){
        $this->scholarshipStudent = $schFormatter;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ScholarshipStudent::all();
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
    public function show(ScholarshipStudent $scholarship)
    {
        return $scholarship;
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
