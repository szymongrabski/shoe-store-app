import React from 'react';
import Menu from './Menu';

const Header = () => {
  return (
    <header className='header'>
      <Menu />
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/5219/5219656.png" alt="sneaker-icon" />
      </div>
      <nav className="navbar">
        <span className='name'>SneakerStore</span>
      </nav>
    </header>
  );
}

export default Header;
