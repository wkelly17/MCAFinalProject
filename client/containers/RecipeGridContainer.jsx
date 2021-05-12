import React from 'react';
import fakeData from '../fakeData';
import Recipe from '../components/RecipeSingle';
import Container from '../components/Container';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import {
  useQuery,
  // useMutation,
  useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from 'react-query';
import { getRecipes } from '../utils/apiFunctions';

export default function RecipeGrid({ children }) {
  const { isLoading, isError, data, error } = useQuery('recipes', getRecipes);
  console.log(isLoading, isError, data, error);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return data.map((recipe) => {
    return (
      <Container
        key={recipe._id}
        data-name="recipePreview"
        className="bg-$base4 rounded-md min-w-32 hover:(opacity-80)"
      >
        <Recipe.Preview
          linkId={recipe._id}
          name={recipe.name}
          imageClassName="max-w-full block "
          nameClassName="p-1 text-sm text-center"
          image={recipe.image}
        />
      </Container>
    );
  });
}
