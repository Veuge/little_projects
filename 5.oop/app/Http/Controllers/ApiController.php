<?php

namespace App\Http\Controllers;

use Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ApiController extends Controller
{
    protected $statusCode = HttpResponse::HTTP_OK;

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

    protected function responseWithPagination($collection, $data){
        $data = array_merge($data, [
            'paginator' => [
                'total_count' => $collection->total(),
                'total_pages' => ceil($collection->total() / $collection->count()),
                'current_page' => $collection->resolveCurrentPage(),
                'limit' => $collection->count()
            ]
        ]);

        return $this->response($data);
    }

    public function responseWithError($message){
        return $this->response([
            'error' => [
                'message' => $message,
                'status_code' => $this->getStatusCode()
            ]
        ]);
    }

    public function responseWithSuccess($message){
        return $this->response([
            'success' => [
                'message' => $message,
                'status_code' => $this->getStatusCode()
            ]
        ]);
    }

    public function responseNotFound($message = 'Not found!'){
        return $this->setStatusCode(HttpResponse::HTTP_NOT_FOUND)->responseWithError($message);
    }

    public function responseCreated($message = 'Created!'){
        return $this->setStatusCode(HttpResponse::HTTP_CREATED)->responseWithSuccess($message);
    }

    public function responseUpdated($message = 'Edited!'){
        return $this->setStatusCode(HttpResponse::HTTP_OK)->responseWithSuccess($message);
    }

    public function responseDeleted($message = 'Deleted!'){
        return $this->setStatusCode(HttpResponse::HTTP_OK)->responseWithSuccess($message);
    }

    public function responseInternalError($message = 'Internal error.'){
        return $this->setStatusCode(HttpResponse::HTTP_INTERNAL_SERVER_ERROR)->responseWithError($message);
    }
}
