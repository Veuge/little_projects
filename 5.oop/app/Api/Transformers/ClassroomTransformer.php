<?php

namespace Api\Transformers;

class ClassroomTransformer extends Transformer
{

    public function transform($classroom){
        return [
            'id' => (int) $classroom['id'],
            'classroom_name' => $classroom['classroom_name'],
            'capacity' => $classroom['capacity'],
        ];
    }

}
