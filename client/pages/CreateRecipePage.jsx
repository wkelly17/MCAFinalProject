import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HookForm from '../components/HookFormParts';
import Container from '../components/Container';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import Recipe from '../components/RecipeSingle';
import { useForm, useWatch } from 'react-hook-form';
import { stringifyInstruction } from '../utils/recipeUtils';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQueryClient, QueryClient } from 'react-query';
import { addRecipe, patchRecipe } from '../utils/apiFunctions';

export default function CreateRecipePage(props) {
  const location = useLocation();
  const importedRecipe = location?.state?.recipe || null;
  const errorMessage = location?.state?.errorMessage || null;
  const queryClient = useQueryClient();

  let mutationFunction = importedRecipe?._id ? patchRecipe : addRecipe;
  let recipeId = importedRecipe?._id || null;

  const SubmitMutation = useMutation(mutationFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });

  console.log({ importedRecipe });

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

  // returns a string;
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

  const {
    register,
    handleSubmit,
    errors,
    // Read the formState before render to subscribe the form state through the Proxy
    watch,
  } = useForm({ defaultValues });

  const recipe = watch();
  // debugger;

  console.log(recipe);
  // console.log(defaultValues);

  // todo: console data here;
  let test = recipe?.instructions?.match(/[^\r\n]+/g);
  let test2 = recipe?.ingredients?.match(/[^\r\n]+/g);

  console.log({ test2 });

  let inputClasses = '';
  let labelClasses = 'sr-only';

  return (
    <Default>
      <Container className="flex h-full bg-$base2 ">
        <Container
          id="recipeHeader"
          className="fixed w-full bg-$primary2 text-$base8 px-4 py-1 space-x-7.5 text-lg"
        >
          <Recipe.BackLink
            className={
              'text-$base9 opacity-90 hover:(text-$base7 transform scale-110) focus:(text-$base7 transform scale-110) inline-block '
            }
          />
        </Container>
        <Container className="w-1/3 border-r border-$secondary4 bg-$base2 h-full pt-8">
          <form
            onSubmit={handleSubmit((data) =>
              SubmitMutation.mutate({ data, recipeId })
            )}
            className="bg-$base2 text-$base8 p-3 max-h-screen overflow-auto customScrollBar"
          >
            <label htmlFor="name" className="block p-1 mb-1 text-lg">
              Name
              <input
                {...register('name')}
                className="block w-4/5 p-2 rounded-sm bg-$base4 text-$base8 my-1 "
              />
            </label>
            {/* todo: images?? maybe outside easy scope
            <label htmlFor="newImage" className="block">
              Name
            </label>
            <input {...register('newImage')} className="block w-3/4 p-2 rounded-sm"type="file" /> */}

            {/* // todo: Some sort of folders modal;  Change importing from tags to folders likely in scraping function */}
            {/* <select {...register('tags')} name="tags" id="tags" multiple>
              <option value="1">Cat 1</option>
              <option value="2">Cat 2</option>
            </select> */}

            <label className="block p-1 mb-1 text-lg">
              Prep time
              <input
                {...register('time.prep')}
                className="block w-4/5 p-2 rounded-sm bg-$base4 text-$base8 my-1 "
              />
            </label>
            <label className="block p-1 mb-1 text-lg">
              Cook time
              <input
                {...register('time.cook')}
                className="block w-4/5 p-2 rounded-sm bg-$base4 text-$base8 my-1 "
              />
            </label>
            <label className="block p-1 mb-1 text-lg">
              Servings
              <input
                {...register('servings')}
                className="block w-4/5 p-2 rounded-sm bg-$base4 text-$base8 my-1 "
              />
            </label>
            <label className="block p-1 mb-1 text-lg">
              Link (url) to Original
              <input
                {...register('url')}
                className="block w-4/5 p-2 rounded-sm bg-$base4 text-$base8 my-1 "
              />
            </label>

            <label className="block p-1 mb-1 text-lg">
              Ingredients
              <textarea
                name="ingredients"
                id="ingredientsTextArea"
                className="w-full rounded-sm bg-$base4 text-$base8 min-h-50 p-2 customScrollBar"
                {...register('ingredients')}
              ></textarea>
            </label>

            <label className="block p-1 mb-1 text-lg">
              Directions
              <textarea
                name="instructions"
                id="instructionsTextArea"
                className="w-full rounded-sm bg-$base4 text-$base8 min-h-50 p-2 customScrollBar"
                {...register('instructions')}
              ></textarea>
            </label>

            <input
              type="submit"
              className={
                'bg-$primary3 text-$base8 px-2 py-1 hover:(bg-$primary8 text-$base3) focus:(bg-$primary8 text-$base3) cursor-pointer block my-2'
              }
            />
          </form>
        </Container>

        <Recipe
          id="Recipe"
          key={recipe?.id}
          className="flex bg-$base2 text-$base8 w-2/3 flex-grow pt-8"
        >
          <Container
            id="ingredientsContainer"
            className={
              'border-r border-$secondary4 w-1/2 max-h-screen overflow-y-auto customScrollBar'
            }
          >
            <Container className={'p-6 text-md '}>
              <Recipe.Name name={recipe?.name} className="text-2xl" />
              <Container id="recipeMetaContainer" className="flex">
                <Recipe.Image
                  image={recipe?.image}
                  className="my-4 rounded-md max-w-1/2"
                />
                <Container className="w-1/2 p-3">
                  <Recipe.Source
                    source={recipe?.url}
                    className="text-blue-400 cursor-pointer hover:(text-blue-600 underline)"
                  />
                  {recipe?.time && (
                    <>
                      <Recipe.Prep prep={recipe?.time?.prep} />
                      <Recipe.CookTime cook={recipe?.time?.cook} />
                      <Recipe.Servings servings={recipe?.servings} />
                    </>
                  )}
                </Container>
              </Container>

              {recipe?.ingredients && (
                <>
                  <Recipe.IngredientsContainer className="p-4 overflow-auto text-lg leading-loose ">
                    {recipe?.ingredients
                      ?.match(/[^\r\n]+/g)
                      ?.map((ingredient, idx) => {
                        return (
                          <Recipe.Ingredient
                            key={idx}
                            stringVersion={ingredient}
                          />
                        );
                      })}
                  </Recipe.IngredientsContainer>
                </>
              )}
            </Container>
          </Container>
          <Container id="Directions" className="w-1/2 p-6 ">
            {recipe?.instructions && (
              <>
                <Recipe.DirectionsContainer className="p-4 overflow-auto text-lg leading-7 max-h-100vh customScrollBar">
                  {recipe?.instructions
                    ?.match(/[^\r\n]+/g)
                    .map((instruction, idx) => {
                      return (
                        <Recipe.Direction
                          key={idx}
                          id={`direction${idx}`}
                          stringVersion={instruction}
                          className="p-2 my-2 "
                        />
                      );
                    })}
                </Recipe.DirectionsContainer>
              </>
            )}
          </Container>
        </Recipe>
      </Container>
      <ToastContainer />
    </Default>
    //  <HookForm
    //    defaultValues={defaultValues}
    //    className="flex-grow bg-$base2 text-$base8 flex"
    //    onSubmit={(e) => console.log(data)}
    //    onChange={(e) => console.log(data)}
    //  >
    //    <HookForm.Container className="border border-$primary4 w-1/2">
    //      {/* <p>new recipe</p> */}
    //      <HookForm.Input
    //        name="name"
    //        labelText={'Recipe Title'}
    //        labelClasses={labelClasses}
    //        inputClasses={'bg-transparent w-full block p-2'}
    //        wrapperTag={'h1'}
    //        wrapperClasses="text-3xl"
    //        placeholder="Recipe Name"
    //      />
    //      {checkForImage('max-w-64')}
    //      <HookForm.Container className="p-2">
    //        <HookForm.Input
    //          name="url"
    //          labelText={'Url to recipe'}
    //          labelClasses="inline-block "
    //          inputClasses={'bg-transparent inline-block w-full'}
    //          placeholder="url"
    //        />
    //        <HookForm.Input
    //          name="time.prep"
    //          labelText={'Prep time'}
    //          labelClasses="inline-block "
    //          inputClasses={'bg-transparent inline w-full'}
    //          placeholder="prep time"
    //        />
    //        <HookForm.Input
    //          name="time.cook"
    //          labelText={'Cook time'}
    //          labelClasses="inline-block "
    //          inputClasses={'bg-transparent inline w-full'}
    //          placeholder="cook time"
    //        />
    //      </HookForm.Container>
    //      <HookForm.Input
    //        name={'url'}
    //        labelText={'Url to Recipe'}
    //        labelClasses={labelClasses}
    //        inputClasses={'border block w-max'}
    //        wrapperTag={'h1'}
    //        wrapperClasses=""
    //        placeholder="Url to Recipe"
    //      />
    //    </HookForm.Container>
    //  </HookForm>
  );
}
