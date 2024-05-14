  import './App.css';
  import React , {useState} from 'react';
  import {BrowserRouter, Routes,Route} from "react-router-dom";
  import NavbarContainer from './components/layout/NavbarContainer';
  import Login from './pages/Login';
  import Registration from './pages/Registration';
  import Home from './pages/Home';
  import Profile from './pages/Profile';
  import { Toaster } from 'react-hot-toast';
  import Footer from './components/layout/Footer';
  import ForgetPasswordForm from './pages/ForgetPassword';

  function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleToggleDarkMode = () => {
      setDarkMode(!darkMode);
      const app = document.querySelector("#root");
      app.classList.toggle("dark-mode");
    };
    return (  
  <>
  <div id = "#root" className={darkMode ? "App dark-mode" : "App"}>
  <BrowserRouter>
  <Toaster />
  <NavbarContainer onToggleDarkMode = {handleToggleDarkMode} />
  <Routes>
  <Route path='/'>
  <Route path='/login' element = {<Login />} />
  <Route path='/signup' element = {<Registration />}/>
  <Route path='/profile' element = {<Profile />} />
  <Route path='/forgotpw' element = {<ForgetPasswordForm />} />
  <Route path='/' element = {<Home />} />
  </Route>
  </Routes>
  <Footer />
  </BrowserRouter>
  </div>
  </>
    );
  }

  export default App;
