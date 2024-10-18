import React, { useContext } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className=''>
      {theme === 'dark' ? (
        <div className='flex items-center cursor-pointer' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <HiSun className='text-primary text-2xl ' /> Light Mode
        </div>
      ) : (
        <div className='flex items-center cursor-pointer' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <HiMoon className='text-primary text-2xl ' /> Dark Mode
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
