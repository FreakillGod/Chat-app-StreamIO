import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signInImage from '../assets/signup.jpg'

const Auth = () => {

    const [signup, setSignup] = useState(true);

    const handleChange = () => { }

    const switchMode = ()=>{
        setSignup((prevSignup)=> !prevSignup);
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p className=''>{signup ? 'Sign Up' : 'Sign-In'}</p>
                    <form onSubmit={() => { }}>
                        {signup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlfor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder='Name'
                                    onChange={handleChange}
                                />
                            </div>

                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlfor="username">User Name</label>
                            <input
                                name="username"
                                type="text"
                                placeholder='Username'
                                onChange={handleChange}
                            />
                        </div>
                        {signup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlfor="PhoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder='phone number'
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {signup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlfor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlfor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder='Password'
                                onChange={handleChange}
                            />
                        </div>
                        {signup && (<div className='auth__form-container_fields-content_input'>
                            <label htmlfor="confirmPassword">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="text"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                            />
                        </div>)}

                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {signup? 'Already have an account? ':'dont have an account? ' }
                            <span onClick={switchMode}>
                                {signup? 'Sign In':'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signInImage} alt="signIn "/> 
            </div>
        </div>
    )
}

export default Auth