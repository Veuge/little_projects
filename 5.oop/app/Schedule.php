<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function subjects(){
        return $this->belongsToMany('App\Subject', 'schedule_subject', 'schedule_id', 'subject_id');
    }

    /*
    *   TERNARY RELATIONSHIP
    */
    public function regulars(){
        return $this->belongsToMany('App\RegularStudent', 'regular_schedule_subject', 'schedule_id', 'regular_id');
    }

    public function subjectsR(){
        return $this->belongsToMany('App\Subject', 'regular_schedule_subject', 'schedule_id', 'subject_id');
    }
}
