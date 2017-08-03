<?php

namespace Api\Transformers;

class SubjectTransformer extends Transformer
{

    public function transform($subject){
        return [
            'id' => (int) $subject['id'],
            'name' => $subject['name'],
            'description' => $subject['description'],
            'credits' => (int) $subject['credits'],
            'classroom_id' => $subject['classroom_id'],
            'career_id' => $subject['career_id'],
            'schedules' => $subject['schedules'],
        ];
    }

}
