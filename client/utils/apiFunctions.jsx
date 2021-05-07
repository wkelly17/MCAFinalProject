import React from 'react';
import ROUTES from '../constants/ApiRoutes';
import { toDecimal, toVulgar } from 'vulgar-fractions';
import formatQuantity from 'format-quantity';
import parseIngredient from 'parse-ingredient';

export function Login(data, event, history) {
  event.preventDefault();
  history.push('/home');
  return console.log(data);
}

export async function scrapeRecipe(
  data,
  event,
  setImportedRecipe,
  setErrorMessage
) {
  debugger;
  // todo: error handling to redirect if non supported url given;

  if (!data.recipeurl) {
    // ! empty object;  Use effect from calling container will then throw out empty object and pass null, but I must pass truth here since I want to use effect to run with imported recipe changes to a truthy value to trigger push history
    return setImportedRecipe({});
  }

  try {
    // pass a full url to a page that contains a recipe
    const response = await fetch(ROUTES.scrapeRecipe, {
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
    initialRecipe.recipe.url = data.recipeurl;
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
      let parsed = parseIngredient(ing)[0];
      let { isGroupHeader, ...restOfRecipe } = parsed;
      restOfRecipe.servings?.replace(/\n/);
      return restOfRecipe;
    });
    initialRecipe.recipe.ingredients = editedIngredients;
    let finalRecipe = initialRecipe.recipe;
    setImportedRecipe(finalRecipe);
    console.log(initialRecipe);
  } catch (error) {
    console.error(error);
    setErrorMessage(
      "Uh oh! Looks like that url isn't supported, but you can still add the recipe manually"
    );
    setImportedRecipe({});
  }
}

// todo: get this hooked up to react query
// export async function getRecipes() {

// }
