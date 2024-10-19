import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Reset success message

    try {
      await signUp(email, password);
      
      // Show success message to the user
      setSuccess('Sign up successful! Redirecting to account...');
      
      // Reset form fields after successful sign-up
      setEmail('');
      setPassword('');
      
      // Redirect user to the account page after a short delay
      setTimeout(() => {
        navigate('/account');
      }, 1000); 

    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setError('The email address is already in use.');
      } else {
        setError(e.message);
      }
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        {error && <p className='bg-red-300 p-3 my-2'>{error}</p>}
        {success && <p className='bg-green-300 p-3 my-2'>{success}</p>} {/* Success message */}
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='email'
                value={email} // Reset input value
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='password'
                value={password} // Reset input value
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>
            Sign up
          </button>
        </form>
        <p className='my-4'>
          Already have an account?{' '}
          <Link to='/signin' className='text-accent'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
