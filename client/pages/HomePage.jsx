import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import FuseSearchBar from '../components/FuseSearchBar';

import Container from '../components/Container';
import RecipeInput from '../containers/CreateRecipeInput';
import RecipeSingle from '../containers/RecipeGridContainer';
import RecipeGrid from '../containers/RecipeGridContainer';
import FolderContainer from '../containers/FolderContainer';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { getRecipes } from '../utils/apiFunctions';
import Fuse from 'fuse.js';
import { dashToCamel } from 'windicss/utils';

function HomePage(props) {
  let history = useHistory();
  const { isLoading, isError, data, error } = useQuery('recipes', getRecipes);
  const [search, setSearch] = useState();
  const [folders, setFolders] = useState([]);

  console.log(isLoading, isError, data, error);
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ['name'],
  };
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-xl bg-$primary6">
        <p>Getting those tasties for ya...</p>
      </div>
    );
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  let recipes;
  if (folders.length) {
    recipes = data.filter((recipe) => {
      return recipe.folders.some((folderName) => folders.includes(folderName));
    });
  } else {
    recipes = data;
  }

  const fuse = new Fuse(recipes, options);
  let FuseResult;
  if (search) {
    FuseResult = fuse.search(search);
  } else {
    FuseResult = recipes;
  }

  return (
    <React.Fragment>
      <Container
        as="header"
        id="navBar"
        id="pageHeaderContainer"
        className="bg-$primary4 w-full py-4 px-2 text-$base8 flex"
      >
        [nav] [logo] [calendar] [groceryList]
        <Container className="ml-auto">
          <FuseSearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded bg-$base2 text-$base8 mr-1 w-54 text-xs"
            placeholder="Search For a Recipe here"
          />
        </Container>
        <Container className="ml-auto">
          <RecipeInput />
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
          [nav ?]
        </Container>
        <Container
          as="div"
          id="folders"
          className="sm:() flex flex-col flex-grow max-w-42  hidden md:(block border-r-1 border-$secondary4) lg:(max-w-55 min-w-44)"
        >
          <FolderContainer setFolders={setFolders} foldersState={folders} />
        </Container>
        <Container
          as="div"
          id="recipesContainer"
          className="m-0 auto-rows-max  grid p-4 gap-6 grid-cols-2 sm:(text-xs grid-cols-3) md:(grid-cols-4) lg:(grid-cols-5) "
        >
          <RecipeGrid
            isLoading={isLoading}
            isError={isError}
            data={FuseResult}
            error={error}
          />
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
