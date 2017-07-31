<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScholarshipStudent extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function subjects(){
        return $this->belongsToMany('App\Subject', 'scholarship_subject', 'scholarship_id', 'subject_id');
    }

    public function career(){
        return $this->belongsTo('App\Career');
    }
}
