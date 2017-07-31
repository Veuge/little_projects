<?php

namespace App\Http\Controllers;

use App\Career;
use Api\Transformers\CareerTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class CareerController extends ApiController
{
    protected $careerTransformer;

    function __construct(CareerTransformer $careerTransformer){
        $this->careerTransformer = $careerTransformer;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $limit = Input::get("limit") ?: 10 ;
        $career = Career::paginate($limit);

        if(! $career){
            return $this->responseInternalError();
        }
        else{
            return $this->responseWithPagination($career, [
                'data' => $this->careerTransformer->transformCollection($career->all())
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $newCareer = new Career($request->all());
        if($newCareer->saveOrFail()){
            return $this->responseCreated("Career created successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Career  $career
     * @return \Illuminate\Http\Response
     */
    public function show(Career $career){
        if(! $career){
            return $this->responseNotFound("Career not found.");
        }
        else{
            return $this->response([
                'data' => [
                    $this->careerTransformer->transform($career)
                ]
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Career  $career
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Career $career) {
        if($career->update($request->all())){
            return $this->responseUpdated("Career updated successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Career  $career
     * @return \Illuminate\Http\Response
     */
    public function destroy(Career $career)
    {
        if($career->delete()){
            return $this->responseDeleted("Classroom deleted successfully.");
        }
        else{
            return $this->responseInternalError();
        }
    }
}
