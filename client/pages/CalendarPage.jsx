import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
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
import Calendar from '../components/Calendar';

// ideally this would not all be one component, but the logic is so tightly bound between calendar and droppable cards that refactoring to move the necessary state up might be more time consuming than time I have;
export default function CalendarPage() {
  return <Calendar />;
}
