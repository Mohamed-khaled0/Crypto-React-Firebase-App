import React from 'react'
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-16'>
        <h1 className='text-2xl font-bold'>Sign In </h1>
        <form action="">
            <div className='my-4'>
                <label >Email</label>
                <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                    <input className='bg-primary border border-input rounded-2xl w-full p-2 outline-none ' type="email" placeholder=''/>
                    <AiOutlineMail  className='absolute right-2 top-3 text-gray-300'/>
                </div>
            </div>
            <div className='my-4'>
                <label >Password</label>
                <div className='my-2 w-full relative rounded-2xl shadow-xl'>
                    <input className='bg-primary border border-input rounded-2xl w-full p-2 outline-none ' type="password"/>
                    <AiOutlineLock className='absolute right-2 top-3 text-gray-300'/>
                </div>
            </div>
            <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl '>Sign In</button>
        </form>
        <p>Don't have an account ? <Link to='/signup'  className='text-accent font-bold hover:text-blue-500 duration-200'>Sign Up</Link></p>
      </div>
    </div>
  )
}
