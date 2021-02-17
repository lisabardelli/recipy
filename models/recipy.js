const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const TodoSchema = new Schema({
    name: {
      type: String,
    },
    ingredients: {
      type: Array,
    },
    instructions: {
      type: Array,
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

// Recipe {
//   name: 'Coconut pastries (gujiya)',
//   ingredients: [
//     '275g  flour',
//     '35g  ghee, melted and cooled',
//     'sunflower oil, for kneading and deep-frying',
//     '1 litre whole milk (we used Jersey milk)',
//     '125g  caster sugar',
//     '200g frozen grated  coconut, defrosted',
//     '50g blanched  almonds, finely chopped',
//     '50g raisins',
//     '½ tsp  ground cardamom',
//     '¼ tsp  grated nutmeg'
//   ],
//   instructions: [
//     'First, make the filling. Pour the milk into a pan set over a medium heat and boil for about 25-30 mins until reduced to a thick cream. (It’s best to use a wok, karahi or sturdy casserole for this, because you want the milk to reduce quickly without burning and browning.) Stir continuously, scraping down the sides of the pan as it cooks. When it is the consistency of softly set scrambled eggs and coming away from the side of the pan, turn off the heat.',
//     'Transfer the reduced milk to a clean pan, add the sugar and cook over a low heat for 3-4 mins, stirring all the time, until the sugar has dissolved. Add the coconut, almonds, raisins, cardamom and nutmeg, and turn the heat to medium. Continue cooking for 3-4 mins until the mixture thickens. Turn off the heat and set aside to cool.',
//     'Meanwhile, make the pastry. Sieve the flour and ¼ tsp fine salt into a mixing bowl, then add the cooled melted ghee. Using your fingertips, rub the ghee into the flour until the mixture resembles coarse breadcrumbs. Add just enough cold water to bind the mixture into a very firm dough and knead well until smooth. Cover and leave at room temperature for at least 30 mins.',
//     'Divide and shape the dough into 17-18 balls about 20g each and roughly 3cm in diameter. Keep the dough covered to stop it drying out.',
//     "Roll out each ball on a lightly oiled surface to a circle about 10cm in diameter (the pastry will be thinner if the balls are rolled out individually). Don’t worry if you don't have perfect circles.",
//     'Heat the oil in a wok or karahi over a medium heat to 130°C or until a cube of bread dropped in browns in 1 min. Fry the gujiyas in batches for 6-8 mins until the pastry is golden on both sides. Drain on kitchen paper and leave to cool before serving at room temperature. Will keep in an airtight tin for 3-4 days.'
//   ],
//   tags: [],
//   time: {
//     prep: '30 mins',
//     cook: '1 hr',
//     active: '',
//     inactive: '',
//     ready: '',
//     total: ''
//   },
//   servings: '',
//   image: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/Gujiya-4451c19.jpg'
// }