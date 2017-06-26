<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegularStudent extends Model
{
    public $timestamps = false;

    public function subjects(){
        return $this->belongsToMany('App\Subject');
    }
}
