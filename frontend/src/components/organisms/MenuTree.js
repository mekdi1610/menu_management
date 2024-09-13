import React from "react";
import { MenuItem } from "../molecules/MenuItem";
import { MenuIcon } from "@heroicons/react/outline";

export const MenuTree = ({ menu }) => {
  return (
    <div className="bg-gray-900 h-custom-sidebar w-64 p-4 flex flex-col rounded-xl">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between">
        <span className="text-white text-2xl font-bold">
          <img src="/clip_logo.png" alt="Logo" className="h-8 w-auto" />
        </span>
        <MenuIcon className="h-6 w-6 text-white cursor-pointer" />
      </div>

      <div className="mt-8">
        {/* Render Menu Items */}
        <div className="menu-tree">
          {menu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
