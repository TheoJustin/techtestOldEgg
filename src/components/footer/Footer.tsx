import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className='footer'>
      <div className='footerList'>
        <div className='heading'>Customer Service</div>
        <a className='link' href=''>Help Center</a>
        <a className='link' href=''>Track an Order</a>
        <a className='link' href=''>Return an Item</a>
        <a className='link' href=''>Return Policy</a>
      </div>

      <div className='footerList'>
        <div className='heading'>My Account</div>
        <a className='link' href=''>Login/Register</a>
        <a className='link' href=''>Track an Order</a>
        <a className='link' href=''>Return an Item</a>
        <a className='link' href=''>Return Policy</a>
      </div>

      <div className='footerList'>
        <div className='heading'>Company Information</div>
        <a className='link' href=''>About Newegg</a>
        <a className='link' href=''>Investor Relations</a>
        <a className='link' href=''>Awards/Rankings</a>
        <a className='link' href=''>Hours and Locations</a>
      </div>

      <div className='footerList'>
        <div className='heading'>Tools & Resources</div>
        <a className='link' href=''>Sell On Newegg</a>
        <a className='link' href=''>For Your Business</a>
        <a className='link' href=''>Newegg Partner Service</a>
        <a className='link' href=''>Join Our influencial Network</a>
      </div>

      <div className='footerList'>
        <div className='heading'>Shop Our Brands</div>
        <a className='link' href=''>Newegg Business</a>
        <a className='link' href=''>Newegg Global</a>
        <a className='link' href=''>ABS</a>
        <a className='link' href=''>Rosewell</a>
      </div>
    </div>
  );
}

export default Footer;
