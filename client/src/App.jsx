import React, { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

export const AppContext = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');

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
