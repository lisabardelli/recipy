import React from "react";
import Dairy from "./Dairy";
import Fish from "./Fish";
import Meats from "./Meats";
import Seafood from "./Seafood";
import Vegetables from "./Vegetables";
import Fruits from "./Fruits";

const IngredientList = (props) => {
  return (
    <div>
      <Dairy />
      <Vegetables />
      <Fruits />
      <Meats />
      <Fish />
      <Seafood />
    </div>
  );
};

export default IngredientList;
