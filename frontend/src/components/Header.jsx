import React from 'react';

const Header = () => {
  return (
    <header className='header'>
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/5219/5219656.png" alt="sneaker-icon" />
      </div>
      <nav className="navbar">
        <span>Witaj w <span className='name'>SneakerStore</span>!</span>
      </nav>
    </header>
  );
}

export default Header;
