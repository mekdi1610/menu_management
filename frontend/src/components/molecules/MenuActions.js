import React, { useState } from "react";
import { Button } from "../atoms/Button";
import MenuList from "../molecules/MenuList";

const MenuActions = () => {
  const [expandAll, setExpandAll] = useState(false);
  const [collapseAll, setCollapseAll] = useState(false);

  const handleExpandAll = () => {
    setExpandAll(true);
    setCollapseAll(false);
  };

  const handleCollapseAll = () => {
    setExpandAll(false);
    setCollapseAll(true);
  };

  return (
    <div className="ml-4 gap-4 items-center text-sm">
      <Button onClick={handleExpandAll} variant="expand">Expand All</Button>
      <Button onClick={handleCollapseAll} variant="collapse">Collapse All</Button>
      <MenuList expandAll={expandAll} collapseAll={collapseAll} />
    </div>
  );
};

export default MenuActions;
