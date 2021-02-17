const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
    name: {
      type: String,
      required: [true, "The name field is required"],
    },
    ingredients: {
      type: Array,
      required: [true, "The ingredients field is required"],
    },
    instructions: {
      type: Array,
      required: [true, "The instructions field is required"],
    },
    tags: {
      type: Array,
    },
    time: {
      prep: {
        type: String,
      },
      cook: {
        type: String,
      },
      active: {
        type: String,
      },
      inactive: {
        type: String,
      },
      ready: {
        type: String,
      },
      total: {
        type: String,
      },
    },
    servings: {
      type: String,
    },
    image: {
      type: String,
    },
  });

//create model for todo
const Todo = mongoose.model("recipies", TodoSchema);

module.exports = Todo;

