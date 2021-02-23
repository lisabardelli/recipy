const express = require("express");
const router = express.Router();
const Todo = require("../models/recipy");

router.get("/todos", async (req, res, next) => {
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const totalRecipes = await Todo.countDocuments({});
  const recipes = await Todo.find({})
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.json({
    recipes,
    pageInfo: {
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / PAGE_SIZE),
      pageNumber: page,
      hasMore: totalRecipes > PAGE_SIZE * page + recipes.length,
    },
  });
});

// router.get("/todos", (req, res, next) => {
//   var paginate = 2;
//   var pageNumber = 1;
//   Todo.find({})
//     .skip((pageNumber - 1) * paginate)
//     .limit(paginate)
//     //this will return all the data, exposing only the id and action field to the client
//     .then((data) => res.json(data))
//     .catch(next);
// });

router.post("/todos", async (req, res, next) => {
  if (req.body.action) {
    console.log("in add recipe route");
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else if (req.body.page) {
    console.log("in next page route");
    var paginate = 2;
    const pageNumber = parseInt(req.body.page);
    Todo.find({})
      .skip((pageNumber - 1) * paginate)
      .limit(paginate)
      .then((data) => res.json(data));
  } else if (req.body.ingredients) {
    console.log("in filter button route");
    let regex_array = req.body.ingredients.map(
      (ingredient) => new RegExp(`.*${ingredient}.*`, "i")
    );
    let db_query_array = [];
    regex_array.forEach((ingredient) =>
      db_query_array.push({ ingredients: { $regex: ingredient } })
    );
    console.log(db_query_array);
    const PAGE_SIZE = 20;
    try {
      const page = parseInt(req.query.page || "0");
      const filteredData = await Todo.find({ $and: db_query_array })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      const totalRecipes = await Todo.find({
        $and: db_query_array,
      }).countDocuments();
      const hasMore = totalRecipes > PAGE_SIZE * perPage + filteredData.length;
      res.json({
        recipes: filteredData,
        pageInfo: {
          totalRecipes,
          totalPages: Math.ceil(totalRecipes / PAGE_SIZE),
          hasMore,
          pageNumber: page,
        },
      });
    } catch (e) {
      console.log("error", e);
    }
  } else {
    console.log("in error route");
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/todos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
