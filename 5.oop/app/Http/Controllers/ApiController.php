<?php

namespace App\Http\Controllers;

use Response;

class ApiController extends Controller
{
    protected $statusCode = 200;

    public function getStatusCode(){
        return $this->statusCode;
    }

    public function setStatusCode($code){
        $this->statusCode = $code;

        return $this;
    }

    public function response($data, $headers = []){
        return Response::json($data, $this->getStatusCode(), $headers);
    }

    public function responseWithError($message){
        return $this->response([
            'error' => [
                'message' => $message,
                'status_code' => $this->getStatusCode()
            ]
        ]);
    }

    public function responseNotFound($message = 'Not found'){
        return $this->setStatusCode(404)->responseWithError($message);
    }
}
