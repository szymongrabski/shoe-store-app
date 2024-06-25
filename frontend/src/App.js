import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"

import './styles/style.scss'
import ProductsProvider from './contexts/ProductsContext';
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'
import Admin from './pages/Admin';
import AdminRoute from './utils/AdminRoute';
import ClientRoute from './utils/ClientRoute';

const App = () => {

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <ShoppingCartProvider>
          <ProductsProvider>
          <BrowserRouter>
            <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/productdetails/:id"} element={<ProductDetails/>}/>
            <Route path={"/cart"} element={<ClientRoute><Cart/></ClientRoute>}/>
            <Route path={"/admin"} element={<AdminRoute><Admin/></AdminRoute>}/>
            </Routes>
          </BrowserRouter>
          </ProductsProvider>
      </ShoppingCartProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
