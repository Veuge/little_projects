<?php

namespace Api\Transformers;

class ScholarshipStudentTransformer extends Transformer
{

    public function transform($regular){
        return [
            'id' => (int) $regular['id'],
            'name' => $regular['name'],
            'last_name' => $regular['last_name'],
            'sex' => $regular['gender'],
            'last_payment' => $regular['last_payment'],
            'discount' => $regular['discount'],
            'min_gpa' => (int) $regular['min_gpa']
        ];
    }

}
