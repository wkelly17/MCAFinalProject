import React, { useState } from 'react';
import logo from './logo.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen bg-gradient-to-tl from-pink-500 via-red-500 to-yellow-500 place-items-center ">
      <div className="p-16 mx-auto text-white bg-purple-800 rounded-lg w-max">
        <label className="block p-2 mt-2">
          Username
          <input
            name="login"
            type="text"
            className="block p-2 bg-gray-100 rounded-lg"
          />
        </label>
        <label className="block p-2 mt-2">
          Password
          <input
            name="login"
            type="text"
            className="block p-2 bg-gray-100 rounded-lg"
          />
        </label>
      </div>
    </div>
  );
}

export default App;
