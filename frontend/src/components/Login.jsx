import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const { keycloak } = useKeycloak();

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout();
  };

  return (
    <div className='text-white font-bold p-3 text-xl hover:text-gray-300 transform'>
      {!keycloak.authenticated ? (
        <button onClick={login}>Log in</button>
      ) : (
        <button onClick={logout}>Log out</button>
      )}
    </div>
  );
};

export default Login;
