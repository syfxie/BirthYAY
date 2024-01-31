import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className='bg-light flex flex-col justify-center items-center h-screen'>
            <div className='w-full max-w-sm bg-white border-2 border-b-gray-100 rounded-md px-8 py-8'>
                <div className='flex flex-col items-center'>
                    <h2 className='text-3xl font-bold my-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue200 to-blue100 tracking-tight '>
                        Log in to Celebrate
                    </h2>
                </div>

                <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-2' onSubmit={handleLogIn}>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium leading-6 text-black'
                            >
                                Username
                            </label>

                            <div className='mt-2'>
                                <input
                                    id='username'
                                    name='username'
                                    type='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete='username'
                                    required
                                    className='pl-2 block w-full rounded-md border-2 py-1.5 bg-white text-black shadow-sm placeholder:text-gray-400 focus:border-indigo-600'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium leading-6 text-black'
                            >
                                Password
                            </label>

                            <div className='mt-1'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='new-password'
                                    required
                                    className='pl-2 block w-full rounded-md border-2 py-1.5 bg-white text-black shadow-sm placeholder:text-gray-400 focus:border-indigo-600'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='mt-8 flex w-full justify-center rounded-md bg-gradient-to-r from-blue200 to-blue100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500'
                            >
                                Log in
                            </button>
                        </div>

                        {errorMessage ?
                        <p className='text-red-600 text-sm'>{errorMessage}</p>
                        :
                        null
                        }
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Don't have an account yet?{' '}
                        <Link
                            to='/signup'
                            className='font-semibold leading-6 text-blue200 hover:text-indigo-500'
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

// TODO: Add google auth
