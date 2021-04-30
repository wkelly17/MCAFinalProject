import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SinglePage from '../pages/SingleRecipe';
import HomePage from '../pages/HomePage';
import CreateRecipePage from '../pages/CreateRecipePage';
import { pagesRoutes } from '../constants/pages';

// todo: list
// todo: all crud functionality
// top bar for scaling etc or scaling button inside recipe view;
// Should folders be a separate model? Or just generate the folders from a recipe model.. i.e. fetch all recipes.   Filter out and dedupe folders and render folder list?  Folders array on recipe
// models - users, recipes, ?? folders, ingredients,
// Create = input;   OnSubmit, save data... render a new page with food form fileld out or with blank food form;  Then send that page to the server? (maybe work on this tomorrow night?)  Maybe a double click to edit text or saffron app?
// create is working better now in terms of look, thoguh NOT mobile and tablet friendly.   focused on fxnality first, and then I'll get the rest of looks
// NEED to crud out, but the real question is what functionality next?
// todo.. cancel button on the createEdit page
// navigation buttons?
// folders or calendar or shopping list or pantry or browse for new food?

function App() {
  return (
    <div id="App" className="flex flex-col min-h-100vh noScrollBar">
      <Router>
        <Switch>
          <Route path={pagesRoutes.SINGLE}>
            <SinglePage />
          </Route>
          <Route path={pagesRoutes.CREATE_EDIT}>
            <CreateRecipePage />
          </Route>
          <Route path={pagesRoutes.HOME}>
            <HomePage />
          </Route>
          <Route path={pagesRoutes.LOGIN}>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// <form action="" className="p-6 rounded-lg bg-$base7 text-$base1">
//         <h1 className="pb-4 text-4xl text-center font-cursive ">
//           Welcome to CurryOn
//         </h1>
//         <div className="flex justify-between mb-4">
//           <label htmlFor="email" className="block text-lg">
//             Email
//           </label>
//           <input
//             name="email"
//             type="text"
//             className="h-8 p-2 ml-4 rounded-md text-$base9"
//           />
//         </div>

//         <div className="flex justify-between mb-4">
//           <label htmlFor="password" className="block text-lg">
//             Password
//           </label>
//           <input
//             name="password"
//             type="text"
//             className="h-8 p-2 ml-4 rounded-md text-$base9"
//           />
//         </div>
//         <button className="block px-3 py-1 rounded-md bg-$secondary6 hover:(bg-$primary6 text-$base2) focus:(bg-$primary6 text-$base2) mx-auto">
//           {' '}
//           Log in
//         </button>
//       </form>
