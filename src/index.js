import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginSignup from './Components/Loginregister/LoginSignup'
import Register from './Components/Loginregister/Register'
import Showstonk from './Components/showthing/Showstonk';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Routes>
    <Route path = '/' element={<App/>}></Route>
    <Route path = '/register' element={<Register/>}></Route>
    <Route path = '/login' element={<LoginSignup/>}></Route>
    <Route path = '/shop' element={<Showstonk/>}></Route>
   </Routes>
   
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
