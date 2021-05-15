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

export async function getRecipes(props) {
  try {
    let response = await fetch(ROUTES.getRecipes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    let recipes = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      console.log(recipes);
      return recipes;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addRecipe({ data, ...rest }) {
  // debugger;

  let recipe = data;
  recipe.folders = recipe.folders?.map((folder) => folder.value);
  recipe.ingredients = recipe.ingredients.split(/[\r\n]+/);
  recipe.instructions = recipe.instructions.split(/[\r\n]+/);
  let parsedIngredients = recipe.ingredients.map((ingredient) => {
    let parsed = parseIngredient(ingredient);
    let { isGroupHeader, ...restOfRecipe } = parsed[0];
    return restOfRecipe;
  });

  recipe.ingredients = parsedIngredients;

  try {
    let response = await fetch(ROUTES.addRecipe, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    let recipe = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return recipe;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function patchRecipe({ data, recipeId, ...rest }) {
  // debugger;
  let recipe = data;
  recipe.folders = recipe.folders?.map((folder) => folder.value);
  recipe.recipe.ingredients = recipe.ingredients.split(/[\r\n]+/);
  recipe.instructions = recipe.instructions.split(/[\r\n]+/);
  let parsedIngredients = recipe.ingredients.map((ingredient) => {
    let parsed = parseIngredient(ingredient);
    let { isGroupHeader, ...restOfRecipe } = parsed[0];
    return restOfRecipe;
  });

  recipe.ingredients = parsedIngredients;

  try {
    let response = await fetch(ROUTES.patchRecipe(recipeId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    let recipe = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return recipe;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getFolders(props) {
  try {
    let response = await fetch(ROUTES.folderGet, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    let folders = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return folders;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addFolders(data) {
  if (!data) {
    return;
  }
  //comes in a string with commas,
  let foldersArr = data.newfolders.split(',');
  let ArrObjFolders = foldersArr.map((folder) => {
    return { folderName: folder };
  });
  try {
    let response = await fetch(ROUTES.folderPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ArrObjFolders),
    });
    console.log(response);
    let folders = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return folders;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCalendar() {
  try {
    let response = await fetch(ROUTES.calendarGet, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    let calendar = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return calendar;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function postNewMealToCalendar(state) {
  // debugger;
  try {
    let response = await fetch(ROUTES.calendarAdd, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    console.log(response);
    let calendar = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return calendar;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function patchCalendar(meal) {
  let updatedMeal = {
    currentlyDroppedIn: meal.currentlyDroppedIn,
    recipe: meal.recipe._id,
  };
  try {
    let response = await fetch(ROUTES.calendarMealEdit(meal._id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMeal),
    });
    console.log(response);
    let calendar = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return calendar;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteCalendarMeal(meal) {
  // debugger;

  try {
    let response = await fetch(ROUTES.calendarMealDelete(meal._id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    let calendar = await response.json();
    if (!response.ok) {
      throw new Error('Server response threw an Error');
    } else {
      return calendar;
    }
  } catch (error) {
    console.log(error);
  }
}
