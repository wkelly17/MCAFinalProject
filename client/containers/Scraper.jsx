import React from 'react';
import HookForm from '../components/HookFormParts';
import { scrapeRecipeRoute } from '../constants/ApiRoutes';

import { toDecimal, toVulgar } from 'vulgar-fractions';
import formatQuantity from 'format-quantity';
import parseIngredient from 'parse-ingredient';

// console.log(parse('1 0.75 pounds ground pork', 'eng'));

export default function RecipeWindow(props) {
  // todo! current npm package runs serverside;  Other package I wanted to use just would not at all work;  In a perfect world perhaps, I'd write my own to scrape; Working version in npm right now;
  return (
    <HookForm className="" onSubmit={scrapeRecipe} id="scraper">
      <HookForm.Input
        name="recipeurl"
        labelText="A recipe url"
        labelClasses="block"
        inputClasses="p-1 rounded bg-$base2 text-$base8"
        type="text"
        // defaultValue="https://www.allrecipes.com/recipe/259373/chiles-en-nogada-mexican-stuffed-poblano-peppers-in-walnut-sauce/"
      />
      <HookForm.SubmitButton className="rounded-md mx-auto bg-$secondary6 mt-4 py-1 px-3 block hover:(bg-$primary6 text-$base8) focus:(bg-$primary6 text-$base8)">
        Upload
      </HookForm.SubmitButton>
    </HookForm>
  );
}

async function scrapeRecipe(data, event) {

  try {
    // pass a full url to a page that contains a recipe
    const response = await fetch(scrapeRecipeRoute, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    console.log(response);

    // install this and use it to process ingredients before setting to state?
    // https://www.npmjs.com/package/recipe-ingredient-parser-v3
    let initialRecipe = await response.json();
    initialRecipe.urlSource = data.recipeurl;
    let unicodeRegex = /[\u00BC-\u00BE\u2150-\u215E]/;

    // todo: For each ingredient, if Regex.test(ing) let fraction = string.match(regex);   let converted =toDecimal(fraction)
    // 5/12
    let modifiedIngredients = initialRecipe.recipe.ingredients.map(
      (ingredient) => {
        if (unicodeRegex.test(ingredient)) {
          let unicodeFraction = ingredient.match(unicodeRegex)[0];
          let decimal = toDecimal(unicodeFraction);
          let replaced = ingredient.replace(
            unicodeFraction,
            formatQuantity(decimal)
          );
          return replaced;
        } else {
          return ingredient;
        }
      }
    );
    // above process converted unicodes to
    initialRecipe.recipe.ingredients = modifiedIngredients;

    let editedIngredients = initialRecipe.recipe.ingredients.map((ing) => {
      return parseIngredient(ing)[0];
    });
    initialRecipe.recipe.ingredients = editedIngredients;
    console.log(initialRecipe);
  } catch (error) {
    console.log(error);
  }
}

/* 
{
    "name": "Chiles en Nogada (Mexican Stuffed Poblano Peppers in Walnut Sauce)",
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
    "servings": "8\n",
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1750&h=875&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4543290.jpg"
}

*/
