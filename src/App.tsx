import React from 'react';
import './App.scss';
import './components/header/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import ProductDetail from './pages/product/ProductDetail';
import UserDetails from './pages/user/UserDetails';
import Wishlist from './pages/wishlist/Wishlist';
import WishlistDetail from './components/wishlistcomp/WishlistDetail';
import Cart from './pages/cart/Cart';
import PcStart from './pages/pcstart/PcStart';
import PcHome from './pages/pchome/PcHome';
import Pcparts from './pages/pcparts/Pcparts';


function App() {
  return (
    <div className='page'>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path='/product' element={<ProductDetail/>}/>
          <Route path='/user' element={<UserDetails/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/wishlist-detail' element={<WishlistDetail/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/pc' element={<PcStart/>}/>
          <Route path='/pc/home' element={<PcHome/>}/>
          <Route path='/pc/parts' element={<Pcparts/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
