import React from 'react';
import './App.scss';
import './components/header/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';


function App() {
  return (
    <div className='page'>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
