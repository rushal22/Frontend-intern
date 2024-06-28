import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarContainer from './NavbarContainer';
import Footer from './Footer';
import DarkMode from '../features/ThemeMode';


const MainLayout = () => {
  const [darkMode, handleToggleDarkMode] = DarkMode();

  return (
    <div id="#root" className={darkMode ? "App dark-mode" : "App"}>
        <NavbarContainer onToggleDarkMode={handleToggleDarkMode}/>
        <div className="content">
        <Outlet />
        </div>
        <Footer/>
      
    </div>
  );
};

export default MainLayout;
