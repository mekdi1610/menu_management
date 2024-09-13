<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Allow all origins
        header("Access-Control-Allow-Origin: *");

        // Allow certain methods
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

        // Allow certain headers
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        // Handle preflight requests
        if ($request->getMethod() === 'options') {
            header('HTTP/1.1 200 OK');
            exit;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Add any additional headers if needed
    }
}
