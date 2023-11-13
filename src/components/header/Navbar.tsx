import React from 'react';
import './Navbar.scss';
import Mode from './Mode';
import hamburger from './../../assets/icons/menu.png';
import logo from './../../assets/logo.png';
import search from './../../assets/icons/search.png';
import cart from './../../assets/icons/shopping-cart.png';
import user from './../../assets/icons/user.png';
import flag from './../../assets/icons/singapore.png';
import notification from './../../assets/icons/bell.png';
import location from './../../assets/icons/location.png';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='topnav'>
        <img className='image' src={hamburger} alt="" />
        <img className='image' src={logo} alt="" />
        
        <div className='couple'>
          <img className='image' src={location} alt="" />
          <div className='double'>
            <div className='doubleTop'>Deliver to</div>
            <div className='doubleBot'>Singapore</div>
          </div>
        </div>
        
        <div className='search'>
          <input type="text" />
          <div className='searchclick'>
            <img className='image' src={search} alt="" />
          </div>
        </div>

        <div className='round'>
          <img className='image' src={notification} alt="" />
        </div>
        <div className='round'>
          <img className='image' src={flag} alt="" />
        </div>

        <Mode/>

        <div className='couple'>
          <img className='image' src={user} alt="" />
          <div className='double'>
            <div className='doubleTop'>Welcome</div>
            <div className='doubleBot'>name</div>
          </div>
        </div>
        <div className='double'>
          <div className='doubleTop'>Returns</div>
          <div className='doubleBot'>& Orders</div>
        </div>
        <img className='image' src={cart} alt="" />
      </div>

      <div className='botnav'>
        <div className='navButton'>Free Shipping</div>
        <div className='navButton'>Today's Best Deals</div>
        <div className='navButton'>RTX 4070 TI Series</div>
        <div className='navButton'>New : Intel I9-13900KS</div>
        <div className='navButton'>RTX 4090 TI Series</div>
        
        <div className='navbar-right'>
          <div className='order'>Volume Order</div>
          <div className='spacer'></div>
          <div className='bluebtn'>Feedback</div>
          <div className='spacer'></div>
          <div className='bluebtn'>Help Center</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
