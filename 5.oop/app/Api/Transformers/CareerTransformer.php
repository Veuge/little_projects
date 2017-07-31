<?php

namespace Api\Transformers;

class CareerTransformer extends Transformer
{

    public function transform($career){
        return [
            'id' => (int) $career['id'],
            'name' => $career['name'],
            'description' => $career['description'],
        ];
    }

}
