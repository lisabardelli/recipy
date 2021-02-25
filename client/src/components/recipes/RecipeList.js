import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import Popup from "reactjs-popup";
import { Grid } from "@material-ui/core";
import "./styles/recipeList.styles.css";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}));

const RecipeList = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const classes = useStyles();

  const observer = useRef();
  const lastRecipeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible", node);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      console.log("in filtered pagination branch");
      setRecipes([]);
      fetch(`http://localhost:5000/api/todos?page=${pageNumber}`, {
        method: "POST",
        body: JSON.stringify({ ingredients: selectedIngredients }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        // .then((response) => console.log("response:", response))
        .then(
          ({ totalFilteredRecipesCount, totalPages, totalFilteredRecipes }) => {
            console.log(totalPages, totalFilteredRecipesCount, filteredRecipes);
            setFilteredRecipes((state) => {
              console.log(
                "state1.totalFilteredRecipes",
                state.totalFilteredRecipes
              );
              console.log("totalFilteredRecipes", totalFilteredRecipes);
              console.log("returning", [...state, ...totalFilteredRecipes]);
              console.log("state", state);
              return [...new Set([...state, ...totalFilteredRecipes])];
            });
            setHasMore(totalFilteredRecipes.length > 0);
            setLoading(false);
          }
        );
    } else {
      fetch(`http://localhost:5000/api/todos?page=${pageNumber}`)
        .then((response) => response.json())
        // .then((response) => console.log("response:", response))
        .then(({ totalPages, totalRecipes, recipes }) => {
          // console.log(totalPages, totalRecipes, recipes);
          setRecipes((state) => {
            console.log("state2", state);
            console.log("recipes", recipes);
            return [...state, ...recipes];
          });
          setHasMore(recipes.length > 0);
          setLoading(false);
        });
    }
  }, [pageNumber, selectedIngredients]);

  console.log("outside of all branches");
  console.log("-------------");
  console.log("recipes:", recipes);
  console.log("recipes length:", recipes.length);

  console.log("filtered recipes:", filteredRecipes);
  console.log("filtered recipes length:", filteredRecipes.length);

  return (
    <>
      <div className="all-recipes">
        <Grid container spacing={4} className={classes.gridContainer}>
          <>
            {recipes.map((recipe, index) => {
              if (recipes.length === index + 1) {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card ref={lastRecipeElementRef}>
                      <CardHeader title={recipe.name} />
                      <CardMedia img="recipe.image">
                        <img className="card-img" src={recipe.image}></img>
                      </CardMedia>
                      <CardContent>
                        <h3>ingredients</h3>
                        {recipe.ingredients.map((ing) => {
                          return (
                            <>
                              <li>{ing}</li>
                            </>
                          );
                        })}
                      </CardContent>
                      <h3>Summary</h3>
                      {recipe.summary}
                      <h2>Time</h2>
                      <p>Cook: {recipe.time.cook}</p>
                      <p>Prep: {recipe.time.prep}</p>
                    </Card>
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card>
                      <CardHeader title={recipe.name} />
                      <CardMedia img="recipe.image">
                        <img className="card-img" src={recipe.image}></img>
                      </CardMedia>
                      <CardContent>
                        {recipe.ingredients.map((ing) => {
                          return (
                            <>
                              <li>{ing}</li>
                            </>
                          );
                        })}
                      </CardContent>
                      <h2>Summary</h2>
                      {recipe.summary}
                      <h2>Time</h2>
                      <p>Cook: {recipe.time.cook}</p>
                      <p>Prep: {recipe.time.prep}</p>
                    </Card>
                  </Grid>
                );
              }
            })}
            <>{loading && "Loading..."}</>
          </>
        </Grid>
      </div>
      <>
        <Grid container spacing={4} className={classes.gridContainer}>
          {filteredRecipes.map((recipe, index) => {
            if (filteredRecipes.length === index + 1) {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card ref={lastRecipeElementRef}>
                    <CardHeader title={recipe.name} />
                    <CardMedia img="recipe.image">
                      <img className="card-img" src={recipe.image}></img>
                    </CardMedia>
                    <CardContent>
                      {recipe.ingredients.map((ing) => {
                        return (
                          <>
                            <li>{ing}</li>
                          </>
                        );
                      })}
                    </CardContent>
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
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader title={recipe.name} />
                    <CardMedia img="recipe.image">
                      <img className="card-img" src={recipe.image}></img>
                    </CardMedia>
                    <CardContent>
                      {recipe.ingredients.map((ing) => {
                        return (
                          <>
                            <li>{ing}</li>
                          </>
                        );
                      })}
                    </CardContent>
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
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      </>
    </>
  );
};

export default RecipeList;
