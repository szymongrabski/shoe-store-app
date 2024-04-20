import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const { calculateCartQuantity } = useContext(ShoppingCartContext)
  const quantity = calculateCartQuantity()
  return (
    <div className='w-[100%] h-[70px]'>
      <header className='fixed flex z-10 items-center bg-primary justify-between px-5 w-[100%]'>
        <Link to="/" className="logo link">
          <img src="https://cdn-icons-png.flaticon.com/512/5219/5219656.png" alt="sneaker-icon" />
          <span className='name'>SneakerStore</span>
        </Link>
        <Link to='/cart'>
        <button className='cart-btn'>
          <div>
            <ShoppingCartIcon sx={{ color: 'white' }} fontSize="large"/>
          </div>
          <div>
            {quantity}
          </div>
        </button>
        </Link>
      </header>
    </div>
  );
}

export default Header;
