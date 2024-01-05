import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProductsProvider from './contexts/ProductsContext';
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'
import Admin from './pages/Admin';
import './styles/style.css'


const App = () => {

  return (
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
  );
}

export default App;
