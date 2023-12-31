import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(() => navigate('/login'))
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded 2-25'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Name</strong>
            </label>
            <input 
              id='name'
              type='text' 
              placeholder='Enter Name' 
              autoComplete='off' 
              className='form-control rounded-0'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
        </form>
        <p>Login to an existing account</p>
        <Link to='/login' className='btn btn-success w-100 rounded-0'>Login</Link>
      </div>
    </div>
  );
}

export default Signup;