<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    public $timestamps = false;

    public function classroom(){
        return $this->belongsTo('App\Classroom');
    }

    public function scholarships(){
        return $this->belongsToMany('App\ScholarshipStudent');
    }

    public function regulars(){
        return $this->belongsToMany('App\RegularStudent');
    }
}
