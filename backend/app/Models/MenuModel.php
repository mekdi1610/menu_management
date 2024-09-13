<?php

namespace App\Models;

use CodeIgniter\Model;
use Ramsey\Uuid\Uuid;

class MenuModel extends Model
{
    protected $table      = 'menus';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id', 'name', 'depth', 'parent_id', 'created_at', 'updated_at'];
    public $useAutoIncrement = false;

    public function saveMenu($data)
    {
        if (!isset($data['id'])) {
            $data['id'] = Uuid::uuid4()->toString();
        }

        return $this->insert($data);
    }

    public function deleteMenu($id)
    {
        return $this->delete($id);
    }

    public function getMenuHierarchy($parentId = null)
    {
        $menus = $this->orderBy('depth', 'ASC')->findAll();

        return $this->buildHierarchy($menus, $parentId);
    }

    private function buildHierarchy(array $menus, $parentId = null)
    {
        $result = [];
        foreach ($menus as $menu) {
            if ($menu['parent_id'] == $parentId) {
                $children = $this->buildHierarchy($menus, $menu['id']);
                if ($children) {
                    $menu['children'] = $children;
                }
                $result[] = $menu;
            }
        }
        return $result;
    }
}
