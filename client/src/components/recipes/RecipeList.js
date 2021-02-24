import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

const RecipeList = ({ selectedIngredients }) => {
  const [recipeData, setRecipeData] = useState({});
  // const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [hasMore, setHasMore] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState(null);

  const observer = useRef();
  const lastRecipeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Visible", node);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, filteredRecipes]
  );

  const recipesApiCall = (pageInfo = {}) => {
    fetch(`http://localhost:5000/api/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFilteredRecipes(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    recipesApiCall();
  }, []);

  useEffect(() => {}, [loadMore]);

  console.log("filteredRecipes", filteredRecipes);

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:5000/api/todos?page=${
  //       recipeData?.pageInfo?.pageNumber || 0
  //     }`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(totalPages, totalRecipes, recipes);
  //       setRecipeData((state) => {
  //         console.log("state", state);
  //         return data;
  //       });
  //       setLoading(false);
  //     });
  // }, []);

  // console.log("recipeData", recipeData);

  // useEffect(() => {
  //   if (!selectedIngredients.length) return;
  //   fetch(`http://localhost:5000/api/todos`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       ingredients: selectedIngredients,
  //       pageInfo: filteredRecipes.pageInfo || {},
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFilteredRecipes(data);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, [selectedIngredients]);

  // Good for performance as it only recalculates upon dependency changes
  // const filteredRecipes = useMemo(() => {
  //   // Return the original list of recipes if no ingredients are selected
  //   if (!selectedIngredients.length) return recipes;
  //   // Loop through the recipes
  //   const filteredRecipes = recipes.reduce((all, recipe) => {
  //     // Because recipe.ingredients is an array we also have to loop through that
  //     // in this case we're using find
  //     const doesIngredientExist = recipe.ingredients.find((item) => {
  //       // Loop through the checked ingredients and if ONE of the values of recipe.ingredients includes the selected ingredient key (e.g onion) then return true
  //       const checkedIngredients = selectedIngredients.find((selectedItem) => {
  //         return item.includes(selectedItem.toLowerCase());
  //       });
  //       return checkedIngredients;
  //     });
  //     // If this is true then add it to the list
  //     if (doesIngredientExist) {
  //       return [...all, recipe];
  //     }
  //     // If the ingredient doesn't exist at all within recipe.ingredients then just return what we've got
  //     return all;
  //   }, []);
  //   return filteredRecipes;
  // }, [selectedIngredients, recipes]);

  const recipes = filteredRecipes?.recipes || [];

  return (
    <>
      <>
        {recipes.map((recipe, index) => {
          if (recipes.length === index + 1) {
            return (
              <div ref={lastRecipeElementRef}>
                <img src={recipe.image}></img>
                <h2>NAME</h2>
                <p> {recipe.name}</p>
                <h2>INGREDIENTS</h2>
                {recipe.ingredients.map((ing) => {
                  return (
                    <>
                      <li>{ing}</li>
                    </>
                  );
                })}
                <h2>INSTRUCTIONS</h2>
                {recipe.instructions.map((steps) => {
                  return (
                    <ul>
                      <li>{steps}</li>
                    </ul>
                  );
                })}
                <h2>Time</h2>
                <p>Cook: {recipe.time.cook}</p>
                <p>Prep: {recipe.time.prep}</p>
              </div>
            );
          } else {
            return (
              <div>
                <img src={recipe.image}></img>
                <h2>NAME</h2>
                <p> {recipe.name}</p>
                <h2>INGREDIENTS</h2>
                {recipe.ingredients.map((ing) => {
                  return (
                    <>
                      <li>{ing}</li>
                    </>
                  );
                })}
                <h2>INSTRUCTIONS</h2>
                {recipe.instructions.map((steps) => {
                  return (
                    <ul>
                      <li>{steps}</li>
                    </ul>
                  );
                })}
                <h2>Time</h2>
                <p>Cook: {recipe.time.cook}</p>
                <p>Prep: {recipe.time.prep}</p>
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
      </>
    </>
  );
};

export default RecipeList;
