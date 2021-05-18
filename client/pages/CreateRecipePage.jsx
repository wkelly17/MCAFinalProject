import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HookForm from '../components/HookFormParts';
import Container from '../components/Container';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import Recipe from '../components/RecipeSingle';
import { useForm, useWatch } from 'react-hook-form';
import { stringifyInstruction } from '../utils/recipeUtils';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQueryClient, QueryClient } from 'react-query';

import EditRecipeForm from '../containers/EditRecipeForm';
import EditRecipePreview from '../containers/EditRecipePreview';
import { GridOutlineIcon } from '../components/Icons';

export default function CreateRecipePage(props) {
  const location = useLocation();
  const importedRecipe = location?.state?.recipe || null;
  const errorMessage = location?.state?.errorMessage || null;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (errorMessage) {
      toast.warn(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  let defaultIngredients;
  if (importedRecipe) {
    defaultIngredients = importedRecipe?.ingredients
      ?.map((ingredient) => {
        return stringifyInstruction(ingredient);
      })
      .join('\n');
  }

  let defaultValues;
  if (importedRecipe) {
    defaultValues = {
      image: importedRecipe?.image,
      ingredients: defaultIngredients,
      instructions: importedRecipe?.instructions.join('\n\n'),
      tags: importedRecipe.tags,
      time: {
        prep: importedRecipe.time.prep,
        cook: importedRecipe.time.cook,
      },
      servings: importedRecipe.servings,
      url: importedRecipe.url,
      name: importedRecipe.name,
    };
  }

  // NOTE: WOULD NORMALLY DEFINE OUTSIDE OF PAGE, BUT I'M USING THE WATCHED RECIPE VARIABLE AS STATE FOR PREVIEW AND NEED TO PASS IT FROM PAGE LEVEL AS PARENT TO CHILDREN FORM AND PREVIEW
  const {
    register,
    handleSubmit,
    errors,
    // Read the formState before render to subscribe the form state through the Proxy
    watch,
    control,
  } = useForm({ defaultValues });

  const recipe = watch();
  const [starRating, setStarRating] = useState(importedRecipe.rating);
  // debugger;

  console.log(recipe);
  // console.log(defaultValues);

  return (
    <>
      <Container className="flex h-full bg-$base2 ">
        <Container
          as="nav"
          id="recipeHeader"
          className="fixed w-full bg-$primary2 text-$base8 px-4 py-1 space-x-7.5 text-lg z-10"
        >
          <Recipe.BackLink
            className={
              'text-$base9 opacity-90 hover:(text-$base7 transform scale-110) focus:(text-$base7 transform scale-110) inline-block '
            }
          />

          <Link
            to="/home"
            className="text-$base9 opacity-90 hover:(text-$base7 transform scale-110) focus:(text-$base7 transform scale-110) inline-block mx-1  "
          >
            <GridOutlineIcon className="inline-block " />
            <span>Home</span>
          </Link>
        </Container>
        <EditRecipeForm
          importedRecipe={importedRecipe}
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          starRating={starRating}
          setStarRating={setStarRating}
        />

        <EditRecipePreview recipe={recipe} starRating={starRating} />
      </Container>
      <ToastContainer />
    </>
  );
}
