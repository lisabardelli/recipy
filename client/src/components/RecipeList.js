import React, { useState } from "react";

const RecipeList = () => {
  const [recipes, useRecipes] = useState([]);

  const getRecipes = () => {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=pasta,+tomatoes,+cheese&apiKey=07b4ccbd700547cca41c9ada0e860282`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        result.forEach((element) => {
          return <p>${element.title}</p>;
        });
        console.log("Success:", result);
      });
  };

  return (
    <div>
      <p>Recipies</p>
    </div>
  );
};

export default RecipeList;
