import React from 'react';
import { Link } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

import Login from '../Login';

const Header = () => {
  const { keycloak } = useKeycloak();

  const isAdmin = keycloak.authenticated && keycloak.hasRealmRole("admin");

  return (
    <div className='w-[100%] h-[70px]'>
      <header className='fixed flex z-10 items-center bg-primary justify-between px-5 w-[100%]'>
        {isAdmin && (
          <Link to="/admin" className="logo link">
            <span className='name'>Admin</span>
          </Link>
        )}
        <Link to="/" className="logo link">
          <img src="https://cdn-icons-png.flaticon.com/512/5219/5219656.png" alt="sneaker-icon" />
          <span className='name'>SneakerStore</span>
        </Link>
        <Login />
      </header>
    </div>
  );
}

export default Header;
