import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import Navbar from './Navbar';
import { observer } from 'mobx-react-lite';
import authStore from './AuthStore';
import apiService from './ApiService';
//
import AlertMessage from './AlertMessage';
//

function Login() {
  console.log(authStore.isLoggedIn);

  const navigate = useNavigate("");
  const [message, setMessage] = useState(null); 

  const [inpval, setINP] = useState(
    {
      email: '',
      password: ''
    }
  )

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  // const addinpdata = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = inpval;

  //   if (!validateEmail(email)) {
  //     toast.error('Invalid email address!');
  //     return;
  //   }

  
  //   const token = localStorage.getItem('jwtToken');
  //   const res = await fetch("http://localhost:8003/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log(res);

  //   if (res.status === 422 || !data) {
     
  //     console.log("error");
  //   } else {
  //     console.log("data found");
      
  //     toast("Logged in!", { type: "success", position: "top-center", theme: "dark" });;
  //   }

  //   localStorage.setItem('jwtToken', data.token);
  //    //
  //   authStore.setLoggedIn(true);
  //   //
  //     navigate("/crudapp");
  // };
  //

  const addinpdata = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (!validateEmail(email)) {
      // toast.error('Invalid email address!');
      setMessage('Invalid email address!');
      return;
    }

    try {
      const token = await apiService.login(email, password);
      authStore.setToken(token);
      authStore.isLoggedIn=true;
      // toast("Logged in!", { type: "success", position: "top-center", theme: "dark" });
      setMessage(null); 
      navigate("/crudapp");
    } catch (error) {
      console.log("error", error);
      // toast.error("Invalid credentials");
      setMessage('Invalid credentials'); 
    }
  
  }



  return (
    <>
    <Navbar/>
      {message && <AlertMessage message={message} messageType='danger' />} 
    <div className="container ">
      <div className='d-flex justify-content-center'>
        <form className="mt-5 w-50">
          <div className='d-flex justify-content-center'>
            <Typography variant='h4'>Enter Credentials:</Typography>
          </div>
          <div className="row mt-2">
            
            <div className="mb-2  col-12  ">
              <label for="exampleInputEmail1" className="form-label">
                Email address :
              </label>
              <input
                name="email"
                value={inpval.email}
                onChange={setdata}
                type="email"
                className="form-control"
                id="Email"
                aria-describedby="emailHelp"
              />
        
            </div>
            <div className="mb-2   col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Password :
              </label>
              <input
                name="password"
                value={inpval.password}
                onChange={setdata}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            
            <div className=' d-flex  justify-content-center'>
              <button type="submit" onClick={addinpdata} className="btn btn-primary mt-4">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;


