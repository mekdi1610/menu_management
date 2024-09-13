import React, { useState, useEffect } from "react";
import { fetchMenu } from "../../hooks/useMenuData";
import { InsideMenuItem } from "./InsideMenuItem";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/outline";
import AddMenu from "./AddMenu"; // Import the AddMenu component

const MenuList = ({ expandAll, collapseAll }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State for selected menu item
  const [showAddMenu, setShowAddMenu] = useState(false); // State for showing AddMenu

  const handleAddNewMenu = (parentItem, newMenuItem) => {
    const addMenuItem = (items) =>
      items.map((item) => {
        if (item.id === parentItem.id) {
          return { ...item, children: [...(item.children || []), newMenuItem] };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: addMenuItem(item.children) };
        }
        return item;
      });

    setMenuData(addMenuItem(menuData));
  };

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const data = await fetchMenu();
        const initializedData = data.map((item) => ({
          ...item,
          children: item.children || [], // Initialize children as an empty array if not defined
        }));
        setMenuData(initializedData);

        if (expandAll) {
          setExpandedItems(expandAllState(initializedData));
        } else if (collapseAll) {
          setExpandedItems({});
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuData();
  }, [expandAll, collapseAll]);

  const expandAllState = (items) => {
    let expandedState = {};
    items.forEach((item) => {
      expandedState[item.id] = true;
      if (item.children) {
        expandedState = { ...expandedState, ...expandAllState(item.children) };
      }
    });
    return expandedState;
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };

  const handleAddNewClick = () => {
    const newMenuItem = {
      id: "",
      name: "",
      depth: 0,
      parent_id: null,
      children: [],
    };
    setSelectedMenuItem(newMenuItem);
    setShowAddMenu(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;

  return (
    <div className="p-4 w-custom-list h-custom-list text-sm">
      <h2 className="font-bold mb-2 flex items-center">
        <ChevronDownIcon className="h-5 w-5 mr-2" />
        System Management
        <PlusIcon
          className="h-5 w-5 ml-2 cursor-pointer text-blue-600"
          onClick={handleAddNewClick}
        />
      </h2>
      {menuData.length > 0 ? (
        menuData.map((menuItem) => (
          <InsideMenuItem
            key={menuItem.id}
            item={menuItem}
            expanded={expandedItems[menuItem.id] || false}
            toggleExpand={toggleExpand}
            onAddNewMenu={handleAddNewMenu}
            onMenuItemClick={handleMenuItemClick}
            onAddNewClick={handleAddNewClick}
          />
        ))
      ) : (
        <div>No menu items available</div>
      )}

      {showAddMenu && selectedMenuItem && (
        <div className="flex pl-4">
          <AddMenu addNew={true} selectedMenuItem={selectedMenuItem} />
        </div>
      )}
    </div>
  );
};

export default MenuList;