import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../containers/LoginForm';
import ThemeMenu from '../components/ThemeMenu';
import Container from '../components/Container';

function LoginPage(props) {
  let history = useHistory();

  return (
    <Container as="div" className="flex-grow bg-gradient font-body">
      <ThemeMenu />
      <Container className="px-6 py-12 sm:(flex-centerAll)">
        <LoginForm />
      </Container>
    </Container>
  );
}

export default LoginPage;
