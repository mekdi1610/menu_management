<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function ($routes) {
    $routes->get('menus', 'MenuController::index');  // Get all menus hierarchically
    $routes->get('menu/(:segment)', 'MenuController::show/$1');  // Get specific menu by ID
    $routes->get('menu/hierarchy/(:segment)', 'MenuController::showHierarchy/$1');  // Get menu hierarchy for a specific item
    $routes->post('menu/save', 'MenuController::save');  // Save new or update existing menu
    $routes->post('menu/add-hierarchical', 'MenuController::addHierarchicalItem');  // Add item hierarchically
    $routes->put('menu/update/(:segment)', 'MenuController::update/$1');  // Update menu item
    $routes->delete('menu/delete/(:segment)', 'MenuController::delete/$1');  // Delete menu item
});


$routes->get('test-cors', function() {
    return $this->response->setJSON(['message' => 'CORS is working']);
});
