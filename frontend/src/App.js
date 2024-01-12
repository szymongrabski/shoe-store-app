import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'
import Admin from './pages/Admin';
import './styles/style.css'
import ProductsProvider from './contexts/ProductsContext';
import ShoppingCartProvider2 from './reducers/cartReducer';

const App = () => {

  return (
    <ShoppingCartProvider>
        <ProductsProvider>
        <BrowserRouter>
          <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/productdetails/:id"} element={<ProductDetails/>}/>
          <Route path={"/cart"} element={<Cart/>}/>
          <Route path={"/admin"} element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
        </ProductsProvider>
    </ShoppingCartProvider>
  );
}

export default App;
