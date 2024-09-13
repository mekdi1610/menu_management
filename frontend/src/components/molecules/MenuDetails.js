import React, { useState, useEffect } from "react";
import TextInput from "../atoms/TextInput";
import { Button } from "../atoms/Button";
import { updateMenu } from "../../hooks/useMenuData";

const MenuDetails = ({ selectedMenuItem }) => {
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
    if (selectedMenuItem) {
      setMenuData({
        id: selectedMenuItem.id,
        depth: selectedMenuItem.depth,
        parent_id: selectedMenuItem.parent_id,
        name: selectedMenuItem.name,
      });
    }
  }, [selectedMenuItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
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
      const updatedMenu = await updateMenu(menuData);
      setSuccess("Menu item updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-8">
      {selectedMenuItem ? (
        <>
          <TextInput label="Menu ID" value={menuData.id} disabled />
          <TextInput label="Depth" value={menuData.depth} disabled />
          <TextInput label="Parent Data" value={menuData.parent_id} disabled />
          <TextInput
            label="Name"
            name="name"
            value={menuData.name}
            onChange={handleChange}
          />
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </>
      ) : (
        <p>Please select a menu item to view details.</p>
      )}
    </div>
  );
};

export default MenuDetails;
