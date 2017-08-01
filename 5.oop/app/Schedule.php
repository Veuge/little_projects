<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    public $timestamps = false;
    protected $guarded = [];

    public function subjects(){
        return $this->belongsToMany('App\Subjects', 'schedule_subject', 'schedule_id', 'subject_id');
    }
}
