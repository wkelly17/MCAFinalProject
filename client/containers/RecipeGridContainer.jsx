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

export default function RecipeGrid({ data }) {
 

  return data.map((fuseResult) => {
    let recipe = fuseResult.item || fuseResult;
    return (
      <Container
        key={recipe._id}
        data-name="recipePreview"
        className="bg-$base4 rounded-md hover:(opacity-80)"
      >
        <Recipe.Preview
          linkId={recipe._id}
          name={recipe.name}
          imageClassName="w-full max-h-[110px] object-cover block"
          nameClassName="p-1 text-sm text-center"
          image={recipe.image}
        />
      </Container>
    );
  });
}
