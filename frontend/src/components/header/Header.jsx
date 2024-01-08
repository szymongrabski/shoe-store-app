import React, { useContext } from 'react';
import Menu from './Menu';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { calculateCartQuantity } = useContext(ShoppingCartContext)
  const quantity = calculateCartQuantity()
  return (
    <header className='header'>
      <Menu />
      <div className="logo">
        <img src="https://cdn-icons-png.flaticon.com/512/5219/5219656.png" alt="sneaker-icon" />
        <nav className="navbar">
          <span className='name'>SneakerStore</span>
        </nav>
      </div>
      <Link to='/cart'>
      <button>
        Koszyk
        <div>
          {quantity}
        </div>
      </button>
      </Link>
    </header>
  );
}

export default Header;
