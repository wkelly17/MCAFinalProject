import React, { useEffect } from 'react';
import Container from '../components/Container';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import Recipe from '../components/RecipeSingle';

export default function CreateRecipePage({ recipe }) {
  return (
    <>
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
    </>
  );
}
