import React, { useEffect, useState } from "react";
import { fetchMenu } from "../../hooks/useMenuData";
import { MenuTree } from "../organisms/MenuTree";
import { MainLayout } from "../templates/MainLayout";
import MenuSelector from "../molecules/MenuSelector";
import MenuActions from "../molecules/MenuActions";
import MenuDetails from "../molecules/MenuDetails";
import { useRecoilState } from "recoil";
import { selectedMenuItemState } from "../../recoil/atoms";
import { FolderIcon, ViewGridIcon } from "@heroicons/react/solid";
import { InsideMenuItem } from "../molecules/InsideMenuItem";

export const MenuManagement = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useRecoilState(selectedMenuItemState);
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the menu data on component mount
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const data = await fetchMenu();
        setMenuData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuData();
  }, []);

  const handleAddNewMenu = (parentItem, newMenuItem) => {
    const addMenuItem = (items) =>
      items.map((item) => {
        if (item.id === parentItem.id) {
          return { ...item, children: [...item.children, newMenuItem] };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: addMenuItem(item.children) };
        }
        return item;
      });

    setMenuData(addMenuItem(menuData));
  };

  const toggleExpand = (menuItemId) => {
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading menu data: {error.message}</p>;

  const selectedMenuDetails = menuData.find((menu) => menu.id === selectedMenuItem) || {};

  return (
    <MainLayout
      sidebar={
        <div>
          <MenuTree menu={menuData} />
          {menuData.map((menuItem) => (
            <InsideMenuItem
              key={menuItem.id}
              item={menuItem}
              expanded={menuItem.expanded || false}
              toggleExpand={toggleExpand}
              onAddNewMenu={handleAddNewMenu}
            />
          ))}
        </div>
      }
      main={
        <div className="min-h-screen bg-white flex">
          <div className="w-full h-custom-top-header pt-4 pr-12 pb-4 pl-12 gap-8">
            <div className="h-custom-top-header flex items-center text-gray-400 gap-8 text-sm">
              <FolderIcon className="h-5 w-5 mr-2" /> / Menus
            </div>

            <div className="h-custom-top-header flex items-center gap-8 text-custom-lg font-bold">
              <div className="bg-blue-700 rounded-full p-2">
                <ViewGridIcon className="h-5 w-5 text-white" />
              </div>
              Menus
            </div>

            <div className="flex w-full">
              <div className="flex flex-col w-1/2 pr-4">
                <MenuSelector />
                <MenuActions />
              </div>

              <div className="flex w-1/2 pl-4">
                <MenuDetails selectedMenuItem={selectedMenuItem} />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
