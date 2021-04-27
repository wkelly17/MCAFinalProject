import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SinglePage from '../pages/SingleRecipe';
import HomePage from '../pages/HomePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="App" className="flex flex-col min-h-100vh noScrollBar">
      <Router>
        <Switch>
          <Route path="/single:id">
            <SinglePage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
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
