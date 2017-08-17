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
        return $this->belongsToMany('App\ScholarshipStudent', 'scholarship_subject', 'subject_id', 'scholarship_id');
    }

    public function regulars(){
        return $this->belongsToMany('App\RegularStudent', 'regular_subject', 'subject_id', 'regular_id');
    }

    public function schedules(){
        return $this->belongsToMany('App\Schedule', 'schedule_subject', 'subject_id', 'schedule_id');
    }
}
