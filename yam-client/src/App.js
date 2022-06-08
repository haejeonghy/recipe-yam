// import logo from './logo.svg';
import './App.css';
import React from 'react';

import Main from './pages/Main';

import Join from './pages/Join';
import Login from './pages/Login';
import Modify from './pages/Modify';
import Update from './pages/Update';
import Write from './pages/Write';

import Header from './pages/common/Header';
import Footer from './pages/common/Footer';

import { Route, Routes } from "react-router-dom";
import { useState } from 'react'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div>
      <main>
        <Header/>
        <section>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} userInfo={userInfo} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo}/>}/>
            <Route path="/join" element={<Join />}/>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />}/>
            <Route path="/modify" element={<Modify />}/>
            <Route path="/update" element={<Update />}/>
            <Route path="/write" element={<Write />}/>
          </Routes>
        </section>
        <Footer/>
      </main>
    </div>
  );
};

export default App;
