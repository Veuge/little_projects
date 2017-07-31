<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegularStudent extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function subjects(){
        return $this->belongsToMany('App\Subject', 'regular_subject', 'regular_id', 'subject_id');
    }

    public function career(){
        return $this->belongsTo('App\Career');
    }
}
