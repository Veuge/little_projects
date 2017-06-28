<?php

namespace Api\Transformers;

class ClassroomTransformer extends Transformer
{

    public function transform($classroom){
        return [
            'id' => (int) $classroom['id'],
            'name' => $classroom['classroom_name'],
            'capacity' => $classroom['capacity'],
        ];
    }

}
