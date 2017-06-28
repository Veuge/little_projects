<?php

namespace App\Http\Controllers;

use Response;
use App\Subject;
use Api\Transformers\SubjectTransformer;
use Illuminate\Http\Request;

class SubjectController extends ApiController
{
    protected $st;

    function __construct(SubjectTransformer $transformer){
        $this->st = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::all();
        return $this->response([
            'data' => $this->st->transformCollection($subjects->all())
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
        $newSubject = new Subject($request->all());
        if($newSubject->saveOrFail()){
            return $this->responseCreated("Subject created successfully.");
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
                'data' => $this->st->transform($subject)
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
        $subject->update($request->all());
        return $this->responseUpdated("Subject updated successfully.");
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
    }
}
