import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/homelogin.png";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/api/v1/signup`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    });
    if(!response.ok){
        throw new Error('Error signing up');
    }
    toast.success("User signed up successfully");
    navigate("/");
    }catch(error){
        console.error('Error signing up:', error);
        toast.error('An error occurred while signing up');
    }
  }
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="login border shadow">
        <img src={logo} className="login_img" alt="logo" />
        <h2 className="mb-3 text-center">Signup</h2>

        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group  was-validated mb-2">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="First Name"
              name="firstName"
              id="fname"
              value={formData.firstName}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
            ></input>
          </div>
          <div className="form-group  was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
            ></input>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="**********"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
            <button
              type="submit"
              className="btn block mt-2 w-100 btn-dark-blue"
            >
              Sign up
            </button>
          
          <Link to="/">
            <div className="footer">
              Already have an account? <span className="font">Login</span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
