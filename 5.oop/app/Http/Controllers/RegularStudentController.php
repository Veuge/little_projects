<?php

namespace App\Http\Controllers;

use Response;
use App\RegularStudent;
use Api\Transformers\RegularStudentTransformer;
use Illuminate\Http\Request;

class RegularStudentController extends ApiController
{
    protected $rst;

    function __construct(RegularStudentTransformer $transformer){
        $this->rst = $transformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $regulars = RegularStudent::all();

        return $this->response([
            'data' => $this->rst->transformCollection($regulars->all())
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
        $newRegular = new RegularStudent($request->all());
        $newRegular->saveOrFail();

        return $this->responseCreated("Regular student created successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RegularStudent  $regularStudent
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $regular = RegularStudent::find($id);
        if(!$regular){
            return $this->responseNotFound("The student doesn't exist.");
        }

        return response([
            'data' => $this->rst->transform($regular)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RegularStudent  $regularStudent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RegularStudent $regular)
    {
        $regular->update($request->all());

        return $this->responseUpdated('Regular student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RegularStudent  $regularStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegularStudent $regular)
    {
        if($regular->delete()){
            return $this->responseDeleted('Regular student deleted successfully.');
        }
    }
}
