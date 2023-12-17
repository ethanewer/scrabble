import React, { useState, createContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const [accountName, setAccountName] = useState(() => {
    const storedName = localStorage.getItem('accountName');
    return storedName || '';
  });

  const [accountEmail, setAccountEmail] = useState(() => {
    const storedEmail = localStorage.getItem('accountEmail');
    return storedEmail || '';
  });

  // useEffect to update context when states change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('accountName', accountName);
  }, [accountName]);

  useEffect(() => {
    localStorage.setItem('accountEmail', accountEmail);
  }, [accountEmail]);

  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider value={{ 
          isLoggedIn, setLoggedIn, 
          accountName, setAccountName, 
          accountEmail, setAccountEmail, 
        }}>
          <Routes>
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
