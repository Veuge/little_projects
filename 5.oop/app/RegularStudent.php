<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegularStudent extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function career(){
        return $this->belongsTo('App\Career');
    }

    /*
    *   TERNARY RELATIONSHIP
    */
    public function subjects(){
        return $this->belongsToMany('App\Subject', 'regular_subject', 'regular_id', 'subject_id');
    }

    public function schedules(){
        return $this->belongsToMany('App\Schedule', 'regular_subject', 'regular_id', 'schedule_id');
    }
}
