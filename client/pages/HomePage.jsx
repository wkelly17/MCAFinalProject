import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';

import Container from '../components/Container';
import RecipeInput from '../containers/CreateRecipeInput';
import RecipeSingle from '../containers/RecipeGridContainer';
import RecipeGrid from '../containers/RecipeGridContainer';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

function HomePage(props) {
  let history = useHistory();
  let [importedRecipe, setImportedRecipe] = useState();

  return (
    <React.Fragment>
      <Container
        as="header"
        id="navBar"
        id="pageHeaderContainer"
        className="bg-$primary4 w-full py-4 px-2 text-$base8 flex"
      >
        [nav]
        <Container className="ml-auto">
          <RecipeInput setImportedRecipe={setImportedRecipe} />
        </Container>
        {/* <RecipeWindow /> */}
      </Container>
      <Container
        as="div"
        id="pageBodyContainer"
        className={
          'flex-grow no-scrollbar flex bg-$base2 text-$base9 flex-col sm:() md:(flex-row) lg:() '
        }
      >
        <Container
          as="nav"
          id="navBar"
          className="bg-$primary4 py-4 px-2 text-$base8 md:(flex flex-col)"
        >
          [nav]
          {/* <RecipeWindow /> */}
        </Container>
        <Container
          as="div"
          id="folders"
          className="sm:() flex flex-col flex-grow max-w-42 p-4 hidden md:(block border-r-1 border-$secondary4) lg:(max-w-55 min-w-44)"
        >
          [folders]
        </Container>
        <Container
          as="div"
          id="recipesContainer"
          className="m-0 auto-rows-max grid p-4 gap-6 grid-cols-2 sm:(text-xs grid-cols-3) md:(grid-cols-4 text-base) lg:(grid-cols-5) xl:(grid-cols-6)"
        >
          <RecipeGrid />
        </Container>
      </Container>
    </React.Fragment>
  );

  // <React.Fragment>
  //   <Container
  //     as="header"
  //     id="navBar"
  //     id="pageHeaderContainer"
  //     className="bg-$primary4 w-full py-4 px-2 text-$base8 flex"
  //   >
  //     I will be a form to save recipe!
  //     <Container className="ml-auto">
  //       <RecipeInput setImportedRecipe={setImportedRecipe} />
  //     </Container>
  //     {/* <RecipeWindow /> */}
  //   </Container>
  // </React.Fragment>
}

export default HomePage;
