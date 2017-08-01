<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function classroom(){
        return $this->belongsTo('App\Classroom');
    }

    public function scholarships(){
        return $this->belongsToMany('App\ScholarshipStudent', 'scholarship_subject', 'scholarship_id', 'subject_id');
    }

    public function regulars(){
        return $this->belongsToMany('App\RegularStudent', 'regular_subject', 'regular_id', 'subject_id');
    }

    public function schedules(){
        return $this->belongsToMany('App\Schedule', 'schedule_subject', 'schedule_id', 'subject_id');
    }
}
