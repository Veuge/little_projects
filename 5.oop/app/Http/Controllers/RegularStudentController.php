<?php

namespace App\Http\Controllers;

use App\RegularStudent;
use Illuminate\Http\Request;

class RegularStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RegularStudent::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newRegular = new RegularStudent([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'last_payment' => $request->last_payment,
            'next_payment' => $request->next_payment,
            'subjects_allowed' => $request->subjects_allowed,
        ]);

        $newRegular->save();

        return $newRegular;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RegularStudent  $regularStudent
     * @return \Illuminate\Http\Response
     */
    public function show(RegularStudent $regular)
    {
        return $regular;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RegularStudent  $regularStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegularStudent $regular)
    {
        $regular->delete();
    }
}
