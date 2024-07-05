import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes,
  Route, Navigate
} from "react-router-dom";
import './Scss/Main.scss';
import '../node_modules/bootstrap/dist/js/bootstrap'

import Home from './Pages/Home';
import About from './Pages/About';
import Products from './Pages/Products';
import SearchResult from './Pages/SearchResult';
import NotFound from './Pages/NotFound';
import Login  from './Pages/Login';
import Register from './Pages/Register';
import Account from './Pages/User/Account';
import Profil from './Pages/User/Profil';
import Favorits from './Pages/User/Favorits'


const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="About" element={<About />} />

      <Route path="Profil" element={<Profil />} />
      <Route path="Favoris" element={<Favorits />} />
      <Route path="Account" element={<Account />} />
      <Route path="Products" element={<Products />} />
      <Route path="SearchResult" element={<SearchResult />} />
      <Route path="/404" element={<Navigate to={<NotFound />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
