import React from 'react';
import fakeData from '../fakeData';
import Recipe from '../components/RecipeSingle';
import Container from '../components/Container';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import { useParams } from 'react-router-dom';

// ! for mobiles, can go flex column or install a tabs component and use media query for default and mobile...
// https://github.com/reactjs/react-tabs

export default function RecipeSingle(props) {
  let { id } = useParams();
  let recipe = fakeData.filter((recipe) => recipe.id == id)[0];

  return (
    <>
      <Mobile>
        <MobileSingleContainer />
      </Mobile>
      <Default>
        <Recipe id="Recipe" key={recipe.id} className="flex">
          <Container
            id="ingredientsContainer"
            className={'border-r border-$secondary4 w-1/2 '}
          >
            <Container className={'p-6 text-md '}>
              <Recipe.Name name={recipe.name} className="text-2xl" />
              <Container id="recipeMetaContainer" className="flex">
                <Recipe.Image
                  image={recipe.image}
                  className="my-4 rounded-md max-w-1/2"
                />
                <Container className="w-1/2 p-3">
                  <Recipe.Source
                    source={recipe.urlSource}
                    className="text-blue-400 cursor-pointer hover:(text-blue-600 underline)"
                  />
                  <Recipe.Prep prep={recipe.time.prep} />
                  <Recipe.CookTime cook={recipe.time.cook} />
                  <Recipe.Servings servings={recipe.servings} />
                </Container>
              </Container>
              <Recipe.IngredientsContainer className="p-4 overflow-auto text-lg leading-loose max-h-70vh customScrollBar">
                {recipe.ingredients.map((ingredient, idx) => {
                  return (
                    <Recipe.Ingredient key={idx} ingredient={ingredient} />
                  );
                })}
              </Recipe.IngredientsContainer>
            </Container>
          </Container>
          <Container id="Directions" className="w-1/2 p-6 ">
            <Recipe.DirectionsContainer className="p-4 overflow-auto text-lg leading-7 max-h-100vh customScrollBar">
              {recipe.instructions.map((instruction, idx) => {
                return (
                  <Recipe.Direction
                    key={idx}
                    id={`direction${idx}`}
                    instruction={instruction}
                    className="p-2 mb-4 rounded-md"
                  />
                );
              })}
            </Recipe.DirectionsContainer>
          </Container>
        </Recipe>
      </Default>
    </>
  );
}

function MobileSingleContainer() {
  let { id } = useParams();
  let recipe = fakeData.filter((recipe) => recipe.id === id)[0];
  return (
    <Tabs>
      <TabList className="flex">
        <Tab className="py-1 px-2 w-1/2 text-center text-lg cursor-pointer mx-1 bg-$secondary5 rounded-b-xl">
          Ingredients
        </Tab>
        <Tab className="py-1 px-2 w-1/2 text-center text-lg cursor-pointer mx-1 bg-$secondary5 rounded-b-xl">
          Directions
        </Tab>
      </TabList>

      <TabPanel>
        <Recipe id="Recipe" key={recipe.id} className="flex">
          <Container
            id="ingredientsContainer"
            className={'border-r border-$secondary4'}
          >
            <Container className={'p-6 text-md '}>
              <Recipe.Name name={recipe.name} className="text-2xl" />
              <Container id="recipeMetaContainer" className="flex">
                <Recipe.Image
                  image={recipe.image}
                  className="my-4 rounded-md max-w-1/2"
                />
                <Container className="w-1/2 p-3">
                  <Recipe.Source
                    source={recipe.urlSource}
                    className="text-blue-400 cursor-pointer hover:(text-blue-600 underline)"
                  />
                  <Recipe.Prep prep={recipe.time.prep} />
                  <Recipe.CookTime cook={recipe.time.cook} />
                  <Recipe.Servings servings={recipe.servings} />
                </Container>
              </Container>
              <Recipe.IngredientsContainer className="p-4 overflow-auto text-lg leading-loose max-h-70vh customScrollBar">
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <Recipe.Ingredient
                      key={ingredient.description}
                      ingredient={ingredient}
                    />
                  );
                })}
              </Recipe.IngredientsContainer>
            </Container>
          </Container>
        </Recipe>
      </TabPanel>
      <TabPanel>
        <Recipe.DirectionsContainer className="p-4 overflow-auto text-lg leading-7 customScrollBar">
          {recipe.instructions.map((instruction, idx) => {
            return (
              <Recipe.Direction
                key={idx}
                id={`direction${idx}`}
                instruction={instruction}
                className="p-2 mb-4 rounded-md"
              />
            );
          })}
        </Recipe.DirectionsContainer>
      </TabPanel>
    </Tabs>
  );
}
