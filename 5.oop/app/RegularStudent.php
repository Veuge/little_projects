<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Api\RegularStudentFormatter;


class RegularStudent extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function subjects(){
        return $this->belongsToMany('App\Subject', 'regular_subjects', 'regular_id', 'subject_id');
    }
}
