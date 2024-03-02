
import React from 'react'
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/homelogin.png";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../store/auth';
const Login = ({setIsLoggedIn}) => {
 const navigate =  useNavigate();
  const [formData, setFormData] = useState({
    userName:"",
    password:"",
  })

  const  {storeTokenInLs}  = useAuth();
  // const {storetokenInLs }
  const handelChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const  handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/login`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      if(response.ok){
        const res_data = await response.json();
        console.log("res from server", res_data);
        storeTokenInLs(res_data.token)
        setIsLoggedIn(true);
        toast.success("User login successfully");
        navigate("/dashboard")
        
      }
     console.log(response)
    }catch(error){
      console.error('Error in login', error);
      toast.error('An error occurred while login');
    }
  }
  
  return (
   <div className='wrapper d-flex align-items-center justify-content-center w-100'>
     <div className='login border shadow'>
     <img src={logo} className="login_img" alt="logo"/>
      <h2 className='mb-3 text-center'>Login</h2>
      
      <form className='needs-validation' onSubmit={handleSubmit}>
      <div className='form-group  was-validated mb-2'>
        <label htmlFor="email" className='form-label'>Username</label>
        <input type='email' id='email' name="userName" value={formData.userName} onChange={handelChange} className='form-control' required placeholder="admin@example.com"></input>
      </div>
      <div className='form-group was-validated mb-2'>
        <label htmlFor="password" className='form-label'>Password</label>
        <input type='password' id='password' name="password" value={formData.password} onChange={handelChange} className='form-control' required placeholder="**********"></input>
      </div>
      <div className='d-flex justify-between gap-5'>
      <div className='form-group  form-check mb-2'>
      <input type='checkbox' className='form-check-input'></input>
        <label htmlFor="check" className='form-check-label' required>Remember me</label>
      </div>
    <Link to="/forgotPassword"><p className='text-primary'>Forgot password?</p></Link> 
      </div>
      
      <button type='submit' className='btn block mt-2 w-100 btn-dark-blue'>Log in</button>
     <Link to="/signup"><div className="footer">Don't have any account? <span className="font">Sign Up</span></div></Link> 
      </form>
    </div>
   </div>
  )
}

export default Login
