import React, { useState } from 'react';
import logo from './logo.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen shadow-2xl bg-gradient flex-centerAll font-body">
      <form action="" className="p-6 rounded-lg bg-$base7 text-$base1">
        <h1 className="pb-4 text-4xl text-center font-cursive ">
          Welcome to CurryOn
        </h1>
        <div className="flex justify-between mb-4">
          <label htmlFor="email" className="block text-lg">
            Email
          </label>
          <input name="email" type="text" className="h-8 p-2 ml-4 rounded-md" />
        </div>

        <div className="flex justify-between mb-4">
          <label htmlFor="password" className="block text-lg">
            Password
          </label>
          <input
            name="password"
            type="text"
            className="h-8 p-2 ml-4 rounded-md"
          />
        </div>
        <button className="block px-3 py-1 rounded-md bg-$secondary6 hover:(bg-$primary6 text-$base2) focus:(bg-$primary6 text-$base2) mx-auto">
          {' '}
          Log in
        </button>
      </form>
    </div>
  );
}

export default App;
