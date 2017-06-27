<?php

namespace Api;

class ScholarshipStudentFormatter extends Formatter{

    public function transform($scholarshipStudent){

        return [
            'id'            => (int) $scholarshipStudent['id'],
            'name'          => $scholarshipStudent['name'],
            'last_name'     => $scholarshipStudent['last_name'],
            'gender'        => $scholarshipStudent['gender'],
            'last_payment'  => $scholarshipStudent['last_payment'],
            'discount'      => $scholarshipStudent['discount'],
            'min_gpa'       => $scholarshipStudent['min_gpa'],
        ];
    }
}
