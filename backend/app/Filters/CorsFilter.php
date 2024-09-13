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
        header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE, OPTIONS");

        // Allow certain headers
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        // Max age for caching the preflight response
        header("Access-Control-Max-Age: 86400");

        // Handle preflight requests
        if ($request->getServer('REQUEST_METHOD') === 'OPTIONS') {
            header('HTTP/1.1 200 OK');
            exit;
        }
        if ($request->getMethod() === 'OPTIONS') {
            header('HTTP/1.1 200 OK');
            exit;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Add any additional headers if needed
    }
}
