import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HookForm from '../components/HookFormParts';
import Container from '../components/Container';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import Recipe from '../components/RecipeSingle';
import { useForm, useWatch } from 'react-hook-form';
import { stringifyInstruction } from '../utils/recipeUtils';

let testingRecipe = {
  name: 'Chiles Rellenos Autenticos',
  ingredients: [
    {
      quantity: 4,
      quantity2: null,
      unitOfMeasure: null,
      description: 'poblano peppers',
    },
    {
      quantity: 1,
      quantity2: null,
      unitOfMeasure: 'teaspoon',
      description: 'salt',
    },
    {
      quantity: 2,
      quantity2: null,
      unitOfMeasure: 'cups',
      description: 'cotija cheese, divided',
    },
    {
      quantity: 1,
      quantity2: null,
      unitOfMeasure: 'cup',
      description: 'all-purpose flour',
    },
    {
      quantity: 0.5,
      quantity2: null,
      unitOfMeasure: 'cup',
      description: 'vegetable oil for frying',
    },
    {
      quantity: 2,
      quantity2: null,
      unitOfMeasure: null,
      description: 'eggs, separated',
    },
  ],
  instructions: [
    "Set oven rack about 6 inches from the heat source and preheat the oven's broiler.",
    'Bring a pot of lightly salted water to a boil. Prepare a large bowl of ice water.',
    'Place poblano peppers on a baking sheet. Broil until skin bubbles and areas of burned skin appear. Dip peppers into boiling water for about 30 seconds, then place immediately into ice water. When peppers are chilled, remove skin. Slit peppers lengthwise and remove veins and seeds.',
    'Stuff each pepper with 1/4 the cotija cheese and secure pepper openings closed with toothpicks. Place flour into a shallow bowl and dip each pepper in the flour; set aside for coating to set.',
    'Heat vegetable oil in a large skillet over medium heat.',
    'Beat egg whites in a glass or metal bowl until stiff peaks form. Lift your beater or whisk straight up: the tip of the peak formed by the egg whites should stand up. Gently whisk egg yolks into whites. Dip floured peppers into egg mixture to coat.',
    'Fry peppers in the hot oil until browned and the cheese has melted, flipping once, about 5 minutes per side.',
  ],
  tags: [],
  time: {
    prep: '35 mins',
    cook: '15 mins',
    active: '',
    inactive: '5 mins',
    ready: '',
    total: '55 mins',
  },
  servings: '4',
  image:
    'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2142&h=1071&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1120099.jpg',
  url: 'https://www.allrecipes.com/recipe/232422/chiles-rellenos-autenticos/',
};

export default function EditRecipeForm({ importedRecipe, recipe, setRecipe }) {
  // returns a string;

  const defaultIngredients = importedRecipe?.ingredients
    .map((ingredient) => {
      return stringifyInstruction(ingredient);
    })
    .join('\n');

  let defaultValues;
  if (importedRecipe) {
    defaultValues = {
      image: importedRecipe?.image,
      ingredients: defaultIngredients,
      instructions: importedRecipe.instructions.join('\n'),
      tags: importedRecipe.tags,
      time: {
        prep: importedRecipe.time.prep,
        cook: importedRecipe.time.cook,
        active: importedRecipe.time.active,
        ready: importedRecipe.time.ready,
        total: importedRecipe.time.total,
      },
      servings: importedRecipe.servings,
      url: importedRecipe.url,
      name: importedRecipe.name,
    };
  }
  console.log(defaultValues);

  const {
    register,
    handleSubmit,
    errors,
    // Read the formState before render to subscribe the form state through the Proxy
    watch,
  } = useForm({ defaultValues });
  const onSubmit = (data) => console.log(data);

  // debugger;

  // console.log(defaultValues);

  // todo: console data here;
  let test = recipe?.instructions?.match(/[^\r\n]+/g);
  let test2 = recipe?.ingredients?.match(/[^\r\n]+/g);

  console.log({ test2 });

  let inputClasses = '';
  let labelClasses = 'sr-only';

  return (
    <Container className="w-1/3">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-300">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          {...register('name')}
          className="block"
          onChange={(e) => setRecipe()}
        />
        <textarea
          name="ingredients"
          id="ingredientsTextArea"
          cols="30"
          rows="10"
          {...register('ingredients')}
        ></textarea>
        <textarea
          name="instructions"
          id="instructionsTextArea"
          cols="30"
          rows="10"
          {...register('instructions')}
        ></textarea>
        <input type="submit" />
      </form>
    </Container>
  );
}
