<?php
namespace Api;

abstract class Formatter{

    public function transformCollection(array $items){
        return array_map([$this, 'transform'], $items);
    }

    public abstract function transform($item);

}
