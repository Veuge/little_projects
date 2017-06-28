<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RegularStudent;
use App\Subject;

class RegularSubjectController extends Controller
{
    public function index(RegularStudent $regular){
        $subjects = $regular->subjects()->get();
        return $subjects;
    }

    public function store(RegularStudent $regular, Request $request){
        dd("store");
    }

    public function show(RegularStudent $regular, Subject $subject){
        $subjects = $regular->subjects()->get();
        return $subjects->contains('MAT-136');
    }

    public function update(RegularStudent $regular, Request $request){
        dd("update");
    }

    public function destroy(RegularStudent $regular, Request $request){
        dd("destroy");
    }
}
