import React from 'react'
import logo from "../image/homelogin.png";
import './Forgotpassword.css';
import { Link } from 'react-router-dom';
const Newpassword = () => {
  return (
    <section className='wrapper'>
     <div className="container">
     <div className="col-sm-8 offset-sm-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 text-center">
             <div className="logo mb-4">
                <img src={logo} className='img-fluid' alt='logo' />
             </div>
     <form className='rounded bg-white shadow p-5'>
        <h3 className='text-dark fw-bolder gs-4 mb-2'>Setup New Password</h3>
        <div className="fw-normal text-muted mb-4">
            Already have reset your password ? <a href='#' className='text-primary fw-bold text-decoration-none'> Sign in</a>
        </div>
        <div className='form-floating mb-3'>
           
            <input type="password" className='form-control' id='floatingPassword' placeholder='Password' />
            {/* <label htmlFor="floatingPassword">Password</label> */}
        </div>
        <div className='form-floating mb-3'>
            <input type="password" className='form-control' id='floatingPassword' placeholder='Comfirm Password' />
            {/* <label htmlFor="floatingPassword">Confirm Password</label> */}
        </div>
        <div className="form-check d-flex align-items-center">
            <input className='form-check-input' type='checkbox' id='gridcheck' checked/> &nbsp;
            <label htmlFor="gridcheck">
                I Agree <a href='#' className='text-decoration-none'>Terms and conditions</a>
            </label>
        </div>
       <Link to='/'><button type='submit' className='btn btn-primary submit_btn my-4'>Submit</button></Link> 
     </form>
     </div>
     </div>
    </section>
  )
}

export default Newpassword