<?php

namespace Api\Transformers;

class ScholarshipStudentTransformer extends Transformer
{

    public function transform($scholarship){
        if(isset($scholarship['subjects_enrolled'])){
            return [
                'id' => (int) $scholarship['id'],
                'name' => $scholarship['name'],
                'last_name' => $scholarship['last_name'],
                'gender' => $scholarship['gender'],
                'last_payment' => $scholarship['last_payment'],
                'discount' => $scholarship['discount'],
                'min_gpa' => (int) $scholarship['min_gpa'],
                'career_id' => $scholarship['career_id'],
                'subjects' => $scholarship['subjects_enrolled']
            ];
        }
        
        return [
            'id' => (int) $scholarship['id'],
            'name' => $scholarship['name'],
            'last_name' => $scholarship['last_name'],
            'gender' => $scholarship['gender'],
            'last_payment' => $scholarship['last_payment'],
            'discount' => $scholarship['discount'],
            'min_gpa' => (int) $scholarship['min_gpa'],
            'career_id' => $scholarship['career_id'],
        ];
    }

}
