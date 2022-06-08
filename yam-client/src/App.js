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

const App = () => {
  return (
    <div>
      <main>
        <Header/>
        <section>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/join" element={<Join />}/>
            <Route path="/login" element={<Login />}/>
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
