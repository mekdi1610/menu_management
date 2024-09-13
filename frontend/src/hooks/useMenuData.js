export const fetchMenu = async () => {
  const response = await fetch('http://localhost:8080/api/menus');
  if (!response.ok) throw new Error('Failed to fetch menu data');
  return response.json();
};

export const updateMenu = async (menuData) => {
  console.log(menuData)
  const newData = {
    name: menuData.name
  }
  const response = await fetch(`http://localhost:8080/api/menu/update/${menuData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "Failed to update menu item.");
  }

  return response.json();
};
