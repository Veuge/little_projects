<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScholarshipStudent extends Model
{
    public $timestamps = false;

    public function subjects(){
        return $this->belongsToMany('App\Subject');
    }
}
