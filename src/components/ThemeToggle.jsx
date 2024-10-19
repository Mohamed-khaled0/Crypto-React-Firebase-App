import React, { useContext } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className=''>
      {theme === 'dark' ? (
        <div className='flex items-center justify-end cursor-pointer duration-300' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <HiSun className='text-primary text-2xl flex justify-end  duration-300' /> 
        </div>
      ) : (
        <div className='flex items-center cursor-pointer justify-end  duration-300' onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <HiMoon className='text-primary text-2xl flex justify-end  duration-300 ' />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
