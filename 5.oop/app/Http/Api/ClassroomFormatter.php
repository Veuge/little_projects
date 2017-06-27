<?php

namespace Api;

class ClassroomFormatter extends Formatter{

    public function transform($classroom){
        return [
            'id'                => $classroom['id'],
            'classroom_name'    => $classroom['classroom_name'],
            'capacity'          => $classroom['capacity']
        ];
    }
}
