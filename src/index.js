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
import NotFound from './Pages/NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="About" element={<About />} />
      <Route path="Products" element={<Products />} />
      <Route path="/404" element={<Navigate to={<NotFound />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
