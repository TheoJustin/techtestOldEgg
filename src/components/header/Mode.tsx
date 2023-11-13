import React, { useState } from 'react';
import './Mode.scss';
import darkmode from './../../assets/icons/night-mode.png';
import lightmode from './../../assets/icons/brightness.png';

const Mode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='mode'>
      <div className={`slider ${isDarkMode ? 'dark' : ''}`} onClick={toggleMode}></div>
      <div className='icon'>
          <img src={darkmode} alt="Dark Mode" className='iconimg'/>
      </div>
      <div className='icon'>
          <img src={lightmode} alt="Light Mode" className='iconimg'/>
      </div>
    </div>
  );
};

export default Mode;
