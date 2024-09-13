<?php

namespace App\Controllers;

use App\Models\MenuModel;
use CodeIgniter\RESTful\ResourceController;

class MenuController extends ResourceController
{
    protected $modelName = 'App\Models\MenuModel';
    protected $format    = 'json';

    public function index()
    {
        $menuModel = new MenuModel();
        $menus = $menuModel->getMenuHierarchy();
        return $this->respond($menus);
    }

    public function show($id = null)
    {
        $menuModel = new MenuModel();
        $menu = $menuModel->find($id);

        if (!$menu) {
            return $this->failNotFound('Menu not found');
        }

        return $this->respond($menu);
    }

    public function showHierarchy($id = null)
    {
        $menuModel = new MenuModel();
        $menu = $menuModel->getMenuHierarchy($id);

        if (!$menu) {
            return $this->failNotFound('Menu not found');
        }

        return $this->respond($menu);
    }

    public function save()
    {
        $menuModel = new MenuModel();
        $data = $this->request->getJSON(true);

        if (!isset($data['name']) || !isset($data['depth'])) {
            return $this->failValidationError('Name and Depth are required fields.');
        }

        $menuModel->saveMenu($data);
        return $this->respondCreated($data, 'Menu item saved successfully.');
    }

    public function addHierarchicalItem()
    {
        $menuModel = new MenuModel();
        $data = $this->request->getJSON(true);

        if (!isset($data['name']) || !isset($data['depth']) || !isset($data['parent_id'])) {
            return $this->failValidationError('Name, Depth, and Parent ID are required fields.');
        }

        $menuModel->saveMenu($data);
        return $this->respondCreated($data, 'Hierarchical menu item added successfully.');
    }

    public function update($id = null)
    {
        // Handle preflight requests
        if ($this->request->getMethod() === 'options') {
            header('HTTP/1.1 200 OK');
            exit;
        }
        $menuModel = new MenuModel();
        $data = $this->request->getJSON(true);

        if ($data === null) {
            return $this->failValidationError('Failed to read JSON data.');
        }

        if (!$menuModel->find($id)) {
            return $this->failNotFound('Menu item not found.');
        }

        if ($menuModel->update($id, $data)) {
            return $this->respond(['message' => 'Menu item updated successfully.']);
        } else {
            return $this->failServerError('Failed to update menu item.');
        }
    }

    public function delete($id = null)
    {
        $menuModel = new MenuModel();

        if (!$menuModel->find($id)) {
            return $this->failNotFound('Menu not found');
        }

        $menuModel->deleteMenu($id);
        return $this->respondDeleted(['id' => $id], 'Menu item deleted successfully.');
    }
}
