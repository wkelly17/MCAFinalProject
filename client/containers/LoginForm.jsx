import React from 'react';
import HookForm from '../components/HookFormParts';
import { Login } from '../utils/apiFunctions';
import { useHistory } from 'react-router-dom';

export default function LoginForm(props) {
  let history = useHistory();

  let inputClasses = 'h-8 p-2 rounded-md text-$base9 bg-$base4 block w-4/5';
  let labelClasses = 'text-lg not-first-of-type:mt-4  inline-block ';

  // todo: REMINDER THIS TAG IS ONLY FOR TRIGGERING WINDI CSS INTELLISENSE ON CLASSNAMES TO ADJUST CONSTS AS NEEDED
  {
    /* <p className='h-2'></p> */
  }

  return (
    <HookForm
      className="rounded-lg mx-auto max-w-sm bg-$base3 mt-16 p-6 text-$base8 sm:(max-w-none)"
      onSubmit={(data, event) => Login(data, event, history)}
      id="loginForm"
    >
      <HookForm.FormTitle
        as={'h1'}
        className="font-cursive text-center pb-4 text-4xl text-$primary7"
      >
        Welcome to CurryOn
      </HookForm.FormTitle>
      <HookForm.Input
        name="Email"
        labelText="Email"
        autoComplete="email"
        labelClasses={labelClasses}
        inputClasses={inputClasses}
      />
      <HookForm.Input
        name="password"
        labelText="Password"
        type="password"
        autoComplete="current-password"
        labelClasses={labelClasses}
        inputClasses={inputClasses}
      />
      <HookForm.SubmitButton className="rounded-md mx-auto bg-$secondary6 mt-4 py-1 px-3 block hover:(bg-$primary6 text-$base8) focus:(bg-$primary6 text-$base8)">
        Log in
      </HookForm.SubmitButton>
    </HookForm>
  );
}
