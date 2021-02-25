import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteButton from "./favoriteButton";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        ></IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const RecipeList = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      console.log("in filtered pagination branch");
      setRecipes([]);
      // setFilteredRecipes([])
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
              return [...state, ...totalFilteredRecipes];
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
  }, [pageNumber]);

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      console.log("in filtered pagination branch");
      setRecipes([]);
      setFilteredRecipes([]);
      setPageNumber(0);
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
              return [...state, ...totalFilteredRecipes];
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

  return (
    <div className="all-recipes">
      <>
        {recipes.map((recipe, index) => {
          const recipeObject = recipe;
          if (recipes.length === index + 1) {
            return (
              <div className="recipe-card" ref={lastRecipeElementRef}>
                <img className="recipe-image" src={recipe.image}></img>
                <p className="recipe-name"> {recipe.name}</p>
                <p className="recipe-summary"> {recipe.summary}</p>
                <p className="time-text">
                  Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                </p>
                <FavoriteButton post={recipeObject} />
                <button className="btn" onClick={handleClickOpen}>
                  More Info
                </button>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <div>
                    <img src={recipe.image}></img>
                    <p> {recipe.name}</p>
                    <p> {recipe.summary}</p>
                    <p>
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
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
                    );
                  </div>
                </Dialog>
              </div>
            );
          } else {
            return (
              <div className="recipe-card">
                <img className="recipe-image" src={recipe.image}></img>
                <p className="recipe-name"> {recipe.name}</p>
                <p className="recipe-summary"> {recipe.summary}</p>
                <p className="time-text">
                  Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                </p>
                <FavoriteButton post={recipeObject} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  More Info
                </Button>
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <div className="popup-container">
                    <img
                      className="popup recipe-image"
                      src={recipe.image}
                    ></img>
                    <p className="popup recipe-name"> {recipe.name}</p>
                    <p className="popup recipe-summary"> {recipe.summary}</p>
                    <p className="popup time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
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
                    );
                  </div>
                </Dialog>
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
      </>
      <div>
        {filteredRecipes.map((recipe, index) => {
          const recipeObject = recipe;
          if (filteredRecipes.length === index + 1) {
            return (
              <div className="recipe-card" ref={lastRecipeElementRef}>
                <img className="recipe-image" src={recipe.image}></img>
                <p className="recipe-name"> {recipe.name}</p>
                <p className="recipe-summary"> {recipe.summary}</p>
                <p className="time-text">
                  Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                </p>
                <FavoriteButton post={recipeObject} />
                <>
                  <div className="popup-container">
                    <img
                      className="popup recipe-image"
                      src={recipe.image}
                    ></img>
                    <p className="popup recipe-name"> {recipe.name}</p>
                    <p className="popup recipe-summary"> {recipe.summary}</p>
                    <p className="popup time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
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
                    );
                  </div>
                </>
              </div>
            );
          } else {
            return (
              <div className="recipe-card" ref={lastRecipeElementRef}>
                <img className="recipe-image" src={recipe.image}></img>
                <p className="recipe-name"> {recipe.name}</p>
                <p className="recipe-summary"> {recipe.summary}</p>
                <p className="time-text">
                  Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                </p>
                <FavoriteButton post={recipeObject} />
                <>
                  <div className="popup-container">
                    <img
                      className="popup recipe-image"
                      src={recipe.image}
                    ></img>
                    <p className="popup recipe-name"> {recipe.name}</p>
                    <p className="popup recipe-summary"> {recipe.summary}</p>
                    <p className="popup time-text">
                      Cook: {recipe.time.cook} Prep: {recipe.time.prep}
                    </p>
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
                    );
                  </div>
                </>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default RecipeList;
