import React from "react";
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/outline";

export const InsideMenuItem = ({
  item,
  expanded,
  toggleExpand,
  onAddNewMenu,
  onMenuItemClick,
  onAddNewClick,
}) => {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const handleAddNewClick = () => {
    const newMenuItem = {
      id: "",
      name: "",
      depth: (item.depth || 1) + 1,
      parent_id: item.id,
      children: [],
    };
    onAddNewMenu(item, newMenuItem);
    onAddNewClick(item); // Pass the clicked menu item to the handler
  };

  return (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer" onClick={() => onMenuItemClick(item)}>
        {hasChildren ? (
          expanded ? (
            <ChevronDownIcon
              className="h-5 w-5 mr-2"
              onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
            />
          ) : (
            <ChevronRightIcon
              className="h-5 w-5 mr-2"
              onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
            />
          )
        ) : (
          <div className="w-5 mr-2" />
        )}
        <span>{item.name}</span>
        <PlusIcon
          className="h-5 w-5 ml-2 p-1 text-white cursor-pointer bg-blue-900 rounded-full"
          onClick={handleAddNewClick}
        />
      </div>

      {expanded && hasChildren && (
        <div className="ml-4">
          {item.children.map((child) => (
            <InsideMenuItem
              key={child.id}
              item={child}
              expanded={expanded}
              toggleExpand={toggleExpand}
              onAddNewMenu={onAddNewMenu}
              onMenuItemClick={onMenuItemClick}
              onAddNewClick={onAddNewClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};