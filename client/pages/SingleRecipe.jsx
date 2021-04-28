import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import Container from '../components/Container';
import RecipeWindow from '../containers/CreateRecipeInput';
import RecipeSingle from '../containers/RecipeSingle';

function LoginPage(props) {
  let history = useHistory();

  return (
    <React.Fragment>
      <Container
        as="div"
        id="pageContainer"
        className={
          'flex-grow no-scrollbar flex bg-$base2 text-$base9 flex-col sm:() md:(flex-row) lg:() '
        }
      >
        <Container
          as="nav"
          id="navBar"
          className="bg-$primary4 px-2 py-4 text-$base8 md:(flex flex-col)"
        >
          [nav]
          {/* <RecipeWindow /> */}
        </Container>
        <Container
          as="div"
          id="folders"
          className="flex flex-col hidden  p-4 flex-grow max-w-42 sm:() md:(block border-r-1 border-$secondary4) lg:(max-w-55 min-w-44)"
        >
          [folders]
        </Container>
        <Container as="div" id="recipeContainer" className="flex-grow m-0">
          <RecipeSingle />
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default LoginPage;
