import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import AuthProvider from './Components/Authentication/AuthContext';
import UnAuthenticatedRoute from './Components/Authentication/UnAuthenticateRoute';
import PrivateRoute from './Components/Authentication/PrivateRoute';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

// Pages
import HomePage from './Pages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
      <Routes>
        <Route exact path="/login" element={<UnAuthenticatedRoute><LoginPage /></UnAuthenticatedRoute>} />
      </Routes>
      <Routes>
        <Route exact path="/register" element={<UnAuthenticatedRoute><RegisterPage /></UnAuthenticatedRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
