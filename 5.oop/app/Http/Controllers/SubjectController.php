<?php

namespace App\Http\Controllers;

use App\Subject;
use Api\SubjectFormatter;
use Illuminate\Http\Request;

class SubjectController extends Controller
{

    protected $subjectFormatter;

    public function __construct(SubjectFormatter $subFormatter){
        $this->subjectFormatter = $subFormatter;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Subject::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newSubject = new Subject([
            'name' => $request->name,
            'description' => $request->description,
            'credits' => $request->credits,
            'classroom_id' => $request->classroom_id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function show(Subject $subject)
    {
        return $subject;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();
    }
}
