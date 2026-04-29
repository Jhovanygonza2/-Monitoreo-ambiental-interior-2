<?php
// CodeIgniter Example
// Ligero y fácil para proyectos simples con esta API.

namespace App\Controllers;

class Mobility extends BaseController
{
    public function index()
    {
        $data = ['status' => 'success', 'data' => []];
        return $this->response->setJSON($data);
    }
}
