import React, { useState } from 'react';

const AppContext = React.createContext();

function AppContextProvider(props) {
  //   user return from useAuth
  const [themeColor, setThemeColor] = useState(fetchTheme());

  function fetchTheme() {
    if (localStorage.colorTheme) {
      document.documentElement.classList.add(localStorage.colorTheme);
      return localStorage.colorTheme;
    } else {
      document.documentElement.classList.add('defaultTheme');
      localStorage.setItem('colorTheme', 'defaultTheme');
      return 'defaultTheme';
    }
  }
  function addThemeToHTML(newTheme) {
    if (newTheme === themeColor) return;
    document.documentElement.classList.replace(themeColor, newTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('colorTheme', newTheme);
    setThemeColor(newTheme);
  }

  // Could also destructure props to just have children;  Some people do that
  return (
    <AppContext.Provider
      value={{
        themeColor,
        addThemeToHTML,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
