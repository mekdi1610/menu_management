import React, { useState, useEffect } from "react";
import { fetchMenu } from "../../hooks/useMenuData";

const MenuSelector = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuOptions = async () => {
      try {
        const data = await fetchMenu();
        setMenuOptions(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuOptions();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;

  return (
    <div>
      <label className="block mb-2">Menu</label>
      <select className="border px-4 py-2 rounded-lg mb-6 ml-4 w-custom-dropdown bg-custom-gray text-md">
        {menuOptions.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MenuSelector;
