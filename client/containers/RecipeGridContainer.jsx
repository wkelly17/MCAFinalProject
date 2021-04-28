import React from 'react';
import fakeData from '../fakeData';
import Recipe from '../components/RecipeSingle';
import Container from '../components/Container';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';

export default function RecipeGrid({ children }) {
  return fakeData.map((recipe) => {
    return (
      <Container
        key={recipe.id}
        data-name="recipePreview"
        className="bg-$base4 rounded-md p-2 min-w-24 hover:(opacity-80)"
      >
        <Recipe.Preview
          key={recipe.id}
          linkId={recipe.id}
          name={recipe.name}
          imageClassName="max-w-full block rounded-md"
          nameClassName=""
          image={recipe.image}
        />
      </Container>
    );
  });
}
