import React from 'react';
import HookForm from '../components/HookFormParts';
import { Login } from '../utils/apiFunctions';

export default function LoginForm(props) {
  let inputClasses = 'h-8 p-2 rounded-md text-$base9 bg-$base4 block';
  let labelClasses = 'text-lg not-first-of-type:mt-4  inline-block ';

  // todo: REMINDER THIS TAG IS ONLY FOR TRIGGERING WINDI CSS INTELLISENSE ON CLASSNAMES TO ADJUST CONSTS AS NEEDED
  {
    /* <p className='h-2'></p> */
  }

  return (
    <HookForm
      className="rounded-lg max-w-sm bg-$base3 p-6 text-$base8 mx-auto mt-16 sm:(max-w-none)"
      onSubmit={Login}
      id="loginForm"
    >
      <HookForm.FormTitle
        as={'h1'}
        className="font-cursive text-center pb-4 text-4xl"
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
      <HookForm.SubmitButton className="rounded-md mx-auto bg-$secondary6 mt-4 py-1 px-3 block hover:(bg-$primary6 text-$base8) focus:(bg-$primary6 text-$base8)" />
    </HookForm>
  );
}
