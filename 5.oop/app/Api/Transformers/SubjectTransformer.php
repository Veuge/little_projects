<?php

namespace Api\Transformers;

class RegularStudentTransformer extends Transformer
{

    public function transform($regular){
        return [
            'id' => (int) $regular['id'],
            'name' => $regular['name'],
            'last_name' => $regular['last_name'],
            'sex' => $regular['gender'],
            'last_payment' => $regular['last_payment'],
            'next_payment' => $regular['next_payment'],
            'subjects_allowed' => (int) $regular['subjects_allowed']
        ];
    }

}
