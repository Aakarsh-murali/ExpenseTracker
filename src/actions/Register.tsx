import React, { useState,FormEvent } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-router-dom';

import { UserPlusIcon } from '@heroicons/react/24/solid';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        toast.success('Registration successful! Please login.');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <Form method="post" onSubmit={handleSubmit}>
                <input type='text' name="username" required
                placeholder='Username'
                aria-label='Your Name'
                autoComplete='given-name'
                onChange={(e) => setUsername(e.target.value)}
                />
                <input type='text' name="password" required
                placeholder='Password'
                aria-label='Your Name'
                autoComplete='given-name'
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='btn btn--dark'>
                    <span>LogIn</span>
                    <UserPlusIcon width={20} />

                </button>

            </Form>
      <NavLink to="/" >
        <p>Already an User? Login</p>
     </NavLink>
    </div>
  );
};

export default Register;
