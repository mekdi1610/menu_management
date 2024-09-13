import React, { useState, useEffect } from "react";
import { fetchMenu } from "../../hooks/useMenuData";
import { InsideMenuItem } from "./InsideMenuItem";
import { ChevronDownIcon } from "@heroicons/react/outline";

const MenuList = ({ expandAll, collapseAll }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const data = await fetchMenu();
        setMenuData(data);

        if (expandAll) {
          setExpandedItems(expandAllState(data)); 
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;

  return (
    <div className="p-4 w-custom-list h-custom-list text-sm">
      <h2 className="font-bold mb-2 flex items-center">
        <ChevronDownIcon className="h-5 w-5 mr-2" />
        System Management
      </h2>
      {menuData.length > 0 ? (
        menuData.map((menuItem) => (
          <InsideMenuItem
            key={menuItem.id}
            item={menuItem}
            expanded={expandedItems[menuItem.id] || false}
            toggleExpand={toggleExpand}
          />
        ))
      ) : (
        <div>No menu items available</div>
      )}
    </div>
  );
};

export default MenuList;
