import React, { useState, useEffect } from "react";
import TextInput from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { addMenu } from "../../hooks/useMenuData"; // Assume addMenu is the function for adding new items

const AddMenu = ({ addNew, selectedMenuItem }) => {
  const [menuData, setMenuData] = useState({
    id: "",
    depth: "",
    parent_id: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (addNew && selectedMenuItem) {
        console.log(selectedMenuItem)
      setMenuData({
        ...menuData,
        parent_id: selectedMenuItem.id,
        depth: Number(selectedMenuItem.depth) ? Number(selectedMenuItem.depth) + 1 : 1,
        name: "",
      });
    } else if (!addNew && selectedMenuItem) {
      setMenuData(selectedMenuItem);
    }
  }, [addNew, selectedMenuItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (menuData.id) {
        await addMenu(menuData);
        setSuccess("Menu item updated successfully.");
      } else {
        await addMenu(menuData);
        setSuccess("Menu item added successfully.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      {addNew ? (
        <>
          <TextInput label="Depth" name="depth" value={menuData.depth} onChange={handleChange} />
          <TextInput label="Parent ID" name="parent_id" value={menuData.parent_id} onChange={handleChange} />
          <TextInput
            label="Name"
            name="name"
            value={menuData.name}
            onChange={handleChange}
          />
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Add Menu Item"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </>
      ) : (
        <p>Menu Item</p>
      )}
    </div>
  );
};

export default AddMenu;