<?php

namespace Api;

class SubjectFormatter extends Formatter{

    public function transform($subject){
        return [
            'id'            => (int)$subject['id'],
            'name'          => $subject['name'],
            'description'   => $subject['description'],
            'credits'       => (int)$subject['credits'],
            'classroom_id'  => (int)$subject['classroom_id'],
        ];
    }
}
