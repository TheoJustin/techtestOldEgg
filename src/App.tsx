import React from 'react';
import './App.scss';
import './components/header/Navbar';
import Navbar from './components/header/Navbar';
import Signin from './pages/signin/Signin';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='page'>
      <Navbar/>
      <Signin/>
      <Footer/>
    </div>
  );
}

export default App;
