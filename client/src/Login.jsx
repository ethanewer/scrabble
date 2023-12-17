import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './App';

function Login() {
  const { setLoggedIn, setAccountName, setAccountEmail } = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data.status === 'success') {
          setLoggedIn(true);
          setAccountName(res.data.name);
          setAccountEmail(res.data.email);
          navigate('/home');
        }  
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded 2-25'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input 
              id='email'
              type='text' 
              placeholder='Enter Email' 
              autoComplete='off' 
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input 
              id='password'
              type='password'
              placeholder='Enter Password' 
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
        </form>
        <p>Create a new account</p>
        <Link to='/register' className='btn btn-success w-100 rounded-0'>Register</Link>
      </div>
    </div>
  );
}

export default Login;