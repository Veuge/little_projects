<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function subjects(){
        return $this->hasMany('App\Subject');
    }
}
