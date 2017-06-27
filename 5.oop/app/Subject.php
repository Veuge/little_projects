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
        return $this->belongsToMany('App\ScholarshipStudent', 'scholarship_subjects', 'scholarship_id', 'subject_id');
    }

    public function regulars(){
        return $this->belongsToMany('App\RegularStudent', 'regular_subjects', 'regular_id', 'subject_id');
    }
}
