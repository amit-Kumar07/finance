import React from 'react'
import './Forgotpassword.css';
import logo from "../image/homelogin.png";
import { Link } from 'react-router-dom';
const Forgotpassword = () => {
  return (
    <section className='wrapper'>
         <div className="container">
            <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
             <div className="logo mb-4">
                <img src={logo} className='img-fluid' alt='logo' />
             </div>
             <form className='rounded bg-white shadow p-5'>
                <h3 className='text-dark fw-bolder fs-4 mb-2'>Forgot Password ?</h3>
                <div className="fw-normal text-muted mb-4">
                   Enter your email to reset your password.
                </div>
                <div className="form-floating mb-3">
                    <input type='email' className='form-control' id='floatingInput' placeholder='name@example.com' />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
               <Link to='/newPassword'><button type='submit' className='btn btn-primary submit_btn my-4'>Submit</button></Link> 
             <Link to='/'><button type='submit' className='btn btn-secondary submit_btn my-4 ms-3'>Cancel</button></Link>   
             </form>
            </div>
         </div>
    </section>
  )
}

export default Forgotpassword