import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signInImage from '../assets/signup.jpg'

const cookies=new Cookies();
const URL= 'http://localhost:5000/auth';

const Auth = () => {

    const initialState={
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        avatarURL:""
    }
    const [form,setForm]=useState(initialState);

    const [signup, setSignup] = useState(true);

    const handleChange = async (e) => {
        setForm({...form,[e.target.name]:e.target.value});
        
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {fullName,username,password,phoneNumber,avatarURL}=form;


        const {data:{token, userId, hashedPassword}}= await axios.post(`${URL}/${signup?'signup':'login'}`,{
            fullName,username,password,avatarURL,phoneNumber,
        })

        cookies.set('token',token)
        cookies.set('username',username)
        cookies.set('fullName',fullName)
        cookies.set('userId',userId)

        if(signup){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);
        }

        window.location.reload();   //to reload after login or signup
        
    }
    const switchMode = ()=>{
        setSignup((prevSignup)=> !prevSignup);
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p className=''>{signup ? 'Sign Up' : 'Sign-In'}</p>
                    <form onSubmit={handleSubmit}>
                        {signup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder='Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="username">User Name</label>
                            <input
                                name="username"
                                type="text"
                                placeholder='Username'
                                onChange={handleChange}
                            />
                        </div>
                        {signup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="PhoneNumber">Phone Number</label>
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
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder='Password'
                                onChange={handleChange}
                            />
                        </div>
                        {signup && (<div className='auth__form-container_fields-content_input'>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="text"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                            />
                        </div>)}
                        <div className='auth__form-container_fields-content_button'>
                            <button type='Submit'>{signup?'Sign UP':'Sign In'}</button>
                        </div>

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