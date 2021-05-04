const mongoose = require('mongoose');

// By default, Mongoose adds an _id property to your schemas.

const IngredientSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    isGroupHeader: Boolean,
  },
  quantity1: Number,
  quantity2: Number,
  unitOfMeasure: String,
});

const recipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', //populate via user
    },
    name: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    ingredients: {
      type: [IngredientSchema],
    },
    directions: [{ type: String }],

    folders: [
      {
        type: String,
      },
    ],
    time: {
      cook: String,
      inactive: String,
      prep: String,
    },

    image: {
      type: String,
    },
    servings: {
      type: Number,
    },

    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/* 

{
    "id": "20c59179-e080-4b98-bc43-4ba3f4eec966",
    "name": "Chiles",
    "ingredients": [
        {
            "quantity": 8,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "poblano peppers",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "tablespoon",
            "description": "olive oil",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "onion, chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "cloves garlic, finely chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 1.75,
            "quantity2": null,
            "unitOfMeasure": "pounds",
            "description": "ground pork",
            "isGroupHeader": false
        },
        {
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "cups",
            "description": "peeled, seeded, and chopped tomatoes",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "ripe plantain, chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "apple, chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "fresh peach, chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "bunch fresh parsley, chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "chopped candied orange peel",
            "isGroupHeader": false
        },
        {
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "pine nuts",
            "isGroupHeader": false
        },
        {
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "raisins",
            "isGroupHeader": false
        },
        {
            "quantity": 2,
            "quantity2": null,
            "unitOfMeasure": "tablespoons",
            "description": "blanched almonds, chopped",
            "isGroupHeader": false
        },
        {
            "quantity": 4,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "whole cloves, ground",
            "isGroupHeader": false
        },
        {
            "quantity": null,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "salt and pepper to taste",
            "isGroupHeader": false
        },
        {
            "quantity": 2.5,
            "quantity2": null,
            "unitOfMeasure": "cups",
            "description": "chopped walnuts",
            "isGroupHeader": false
        },
        {
            "quantity": 1.75,
            "quantity2": null,
            "unitOfMeasure": "cups",
            "description": "milk",
            "isGroupHeader": false
        },
        {
            "quantity": 0.75,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "soft goat cheese",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": "tablespoon",
            "description": "white sugar",
            "isGroupHeader": false
        },
        {
            "quantity": 1,
            "quantity2": null,
            "unitOfMeasure": null,
            "description": "(1 inch) piece cinnamon stick",
            "isGroupHeader": false
        },
        {
            "quantity": 1.5,
            "quantity2": null,
            "unitOfMeasure": "cups",
            "description": "pomegranate seeds",
            "isGroupHeader": false
        },
        {
            "quantity": 0.5,
            "quantity2": null,
            "unitOfMeasure": "cup",
            "description": "chopped fresh parsley",
            "isGroupHeader": false
        }
    ],
    "instructions": [
        "Roast poblano chiles over an open flame on a gas stove or grill until the skin is black and charred on all sides, turning often, 10 to 15 minutes.",
        "Place the charred chiles in a plastic bag or in a large bowl covered with plastic wrap. Allow to sit for 5 to 10 minutes, then open and peel off the skin. Cut a slit in each chile lengthwise and remove the seeds.",
        "Heat olive oil in a large pot over medium heat. Add onion and garlic and cook until soft and translucent, 3 to 4 minutes. Add ground pork and cook until browned, breaking up with a spoon while cooking, about 7 minutes. Mix in tomatoes, plantain, apple, peach, parsley, candied orange peel, pine nuts, raisins, almonds, cloves, salt, and pepper. Simmer until filling is cooked through and flavors are well combined, about 10 minutes.",
        "Combine walnuts, milk, goat cheese, sugar, and cinnamon stick in a blender; blend until walnut sauce is smooth and creamy.",
        "Fill each poblano chile with the pork filling and place on a plate. Spoon walnut sauce over chile and sprinkle with pomegranate seeds and parsley."
    ],
    "tags": [],
    "time": {
        "prep": "1 hr",
        "cook": "30 mins",
        "active": "",
        "inactive": "5 mins",
        "ready": "",
        "total": "1 hr 35 mins"
    },
    "url": "https://www.allrecipes.com/recipe/259373/chiles-en-nogada-mexican-stuffed-poblano-peppers-in-walnut-sauce/",
    "servings": 8,
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1750&h=875&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4543290.jpg",
    "recipeId": 4,
    "currentlyDroppedIn": "05/02/2021Breakfast"
}
*/

const Task = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
