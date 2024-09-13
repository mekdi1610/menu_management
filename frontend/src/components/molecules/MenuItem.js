import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedMenuItemState } from '../../recoil/atoms';
import { FolderIcon, ViewGridIcon } from '@heroicons/react/solid'; // Importing icons

export const MenuItem = ({ item, level = 0 }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useRecoilState(selectedMenuItemState);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = () => {
    setSelectedMenuItem(item);
    if (item.children && item.children.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  const iconClass = `h-5 w-5 mr-2 ${selectedMenuItem?.id === item.id ? 'text-black' : 'text-gray-400'}`;
  const textClass = `font-semibold ${selectedMenuItem?.id === item.id ? 'text-black' : 'text-gray-400'}`;
  const buttonClass = `flex items-center w-full py-1 text-left px-4 rounded-lg hover:bg-gray-700 hover:text-white ${selectedMenuItem?.id === item.id ? 'bg-custom-green' : ''}`;

  return (
    <div>
      <button
        className={buttonClass}
        onClick={handleSelect}
      >
        {item.depth === "1" ? (
          <FolderIcon className={iconClass} />
        ) : (
          <ViewGridIcon className={iconClass} />
        )}
        <span className={textClass}>{item.name}</span>
      </button>
      {isOpen && item.children && item.children.length > 0 && (
        <div className="ml-6">
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};


