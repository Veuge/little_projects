<?php

namespace Api;

class RegularStudentFormatter extends Formatter{

    public function transform($regularStudent){

        return [
            'id'                => (int) $regularStudent['id'],
            'name'              => $regularStudent['name'],
            'last_name'         => $regularStudent['last_name'],
            'gender'            => $regularStudent['gender'],
            'last_payment'      => $regularStudent['last_payment'],
            'next_payment'      => $regularStudent['next_payment'],
            'subjects_allowed'  => $regularStudent['subjects_allowed'],
        ];
    }
}
