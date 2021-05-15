import React, { useState, useEffect } from 'react';

// import HookForm from '../components/HookFormParts';
import Container from '../components/Container';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import { Controller } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addRecipe, patchRecipe, getFolders } from '../utils/apiFunctions';
import ReactSelect from 'react-select';

export default function EditRecipeForm({
  importedRecipe,
  register,
  handleSubmit,
  control,
}) {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('folders', getFolders);

  let mutationFunction = importedRecipe?._id ? patchRecipe : addRecipe;
  let recipeId = importedRecipe?._id || null;

  const SubmitMutation = useMutation(mutationFunction, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });

  if (isLoading) {
    return <span className="p-2">Loading Recipe Form</span>;
  }

  if (isError) {
    return <span className="p-2">Error: {error.message}</span>;
  }
  let reactSelectOptions = data?.map((folder) => {
    return { label: folder.folderName, value: folder.folderName };
  });

  return (
    <>
      <Container className="w-2/5 border-r border-$secondary4 bg-$base2 h-full pt-8 ">
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
              className="block w-11/12 p-2  rounded-sm bg-$base4 text-$base8 my-1 mr-1"
            />
          </label>

          {/* // todo: Some sort of folders modal;  Change importing from tags to folders likely in scraping function */}
          {/* <select {...register('tags')} name="tags" id="tags" multiple>
              <option value="1">Cat 1</option>
              <option value="2">Cat 2</option>
            </select> */}

          <label className="block p-1 mb-1 text-lg">
            Prep time
            <input
              {...register('time.prep')}
              className="block w-11/12 p-2  rounded-sm bg-$base4 text-$base8 my-1 mr-1"
            />
          </label>
          <label className="block p-1 mb-1 text-lg">
            Cook time
            <input
              {...register('time.cook')}
              className="block w-11/12 p-2  rounded-sm bg-$base4 text-$base8 my-1 mr-1"
            />
          </label>
          <label className="block p-1 mb-1 text-lg">
            Servings
            <input
              {...register('servings')}
              className="block w-11/12 p-2  rounded-sm bg-$base4 text-$base8 my-1 mr-1"
            />
          </label>
          <label className="block p-1 mb-1 text-lg">
            Link (url) to Original
            <input
              {...register('url')}
              className="block w-11/12 p-2  rounded-sm bg-$base4 text-$base8 my-1 mr-1"
            />
          </label>
          <label className="block p-1 mb-1 text-lg">
            Folders
            <Controller
              control={control}
              name="folders"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ReactSelect
                  options={reactSelectOptions}
                  isMulti
                  defaultValue=""
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  name="folders"
                  // styles={ReactSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
          </label>

          <label className="block w-11/12 p-1 mb-1 text-lg">
            Ingredients
            <textarea
              name="ingredients"
              id="ingredientsTextArea"
              className="w-full rounded-sm bg-$base4 text-$base8 min-h-50 p-2 customScrollBar"
              {...register('ingredients')}
            ></textarea>
          </label>

          <label className="block w-11/12 p-1 mb-1 text-lg">
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
    </>
  );
}
