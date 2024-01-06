import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [isHoover, setIsHoover] = useState(false);

  const toggleMenu = () => {
    setIsHoover(!isHoover);
  };

  return (
    <div className='menu' onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
      <span className='menu-title'>Menu</span>
      {isHoover && (
        <ul className='menu-list'>
          <li>
            <Link to="/" className='menu-link'>Home</Link>
          </li>
          <li>
            <Link to="/cart" className='menu-link'>Cart</Link>
          </li>
          <li>
            <Link to="/admin" className='menu-link'>Admin</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
