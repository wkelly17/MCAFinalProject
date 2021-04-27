import React from 'react';

export function Login(data, event, history) {
  event.preventDefault();
  history.push('/home');
  return console.log(data);
}
