<?php

namespace App\Http\Controllers;

use Response;
use App\RegularStudent;
use Api\Transformers\RegularStudentTransformer;
use Api\Transformers\SubjectTransformer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class RegularController extends ApiController
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
    public function index()
    {
        $limit = Input::get("limit") ?: 100 ;
        // $nested = Input::get('nested') ?: false;
        $regulars = RegularStudent::paginate($limit);

        if(! $regulars){
            return $this->responseInternalError();
        }
        else{
            // if($nested){
                $nested = RegularStudent::paginate($limit);

                for ($i = 0; $i < count($nested); $i++) {
                    $regular = $nested[$i];
                    $subjects = $regular->subjects()->get();

                    if($subjects){

                        for($j = 0; $j < count($subjects); $j++){
                            $currentSubject = $subjects[$j];
                            $schedule = $currentSubject->selectedSchedule()->get();
                            $currentSubject['selected_schedule'] = $schedule;
                            $subjects[$j] = $currentSubject;
                        }

                        $regular['subjects_enrolled'] = $subjects;
                        $nested[$i] = $regular;
                    }
                }
                return $this->responseWithPagination($nested, [
                    'data' => $this->regularTransformer->transformCollection($nested->all())
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
        $newRegular = new RegularStudent($request->all());
        if($newRegular->saveOrFail()){
            return $this->responseCreated("Regular student created successfully");
        }
        else{
            return $this->responseInternalError();
        }

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

            // 'data' => $this->regularTransformer->transform($regular)

            // IDEA: This works to return an array of one item
            // 'data' => [
            //     $this->regularTransformer->transform($regular)
            // ]
            'data' => [
                $this->regularTransformer->transform($regular)
            ]
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
        if($regular->update($request->all())){
            return $this->responseUpdated('Regular student updated successfully.');
        }
        else{
            return $this->responseInternalError();
        }
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
        else {
            return $this->responseInternalError();
        }
    }
}
// $reg->subjects()->attach([1 => ['schedule_id' => 3]]);
