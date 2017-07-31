<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function regulars(){
        return $this->hasMany('App\RegularStudent');
    }

    public function scholarships(){
        return $this->hasMany('App\ScholarshipStudent');
    }
}
