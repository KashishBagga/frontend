import React, { useState } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import Navbar from './Navbar';







function Signup() {

  const navigate = useNavigate("");
 



  const [inpval, setINP] = useState(
    {
      name: '',
      username:'',
      email: '',
      password: '',
      city: '',
      Class: '',
      section: '',
    
    }
  )

  
  const [errors, setErrors] = useState({});
  
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;//The alternative to using const { name, value } = e.target to extract the name and value from the event target in React would be to directly access the properties using dot notation such that
    // const name = event.target.name;
    // const value = event.target.value;

    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
     
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null
    }));
    
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, username, email, password ,  city, Class, section} = inpval;

    
    let formErrors = {};
    if (name === '') {
      formErrors.name = 'Name is required.';
    }

    if (email === '') {
      formErrors.email = 'Email is required.';
    }

    if (city === '') {
      formErrors.city = 'City is required.';
    }
    
    if (username === '') {
      formErrors.username= 'username is required.';
    }

    if (Class === '') {
      formErrors.Class = 'class is required.';
    }

    if (password === '') {
      formErrors.password = 'password is required.';
    }
    if (section === '') {
      formErrors.section = 'section is required.';
    }
    console.log(formErrors)
    if (Object?.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    

    const res = await fetch("http://localhost:8003/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        city,
        Class,
        section,
      
      }),
    });

    const data = await res.json();
    console.log(res);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    } else {
      console.log("data added");
      toast("added!", { type: "success", position: "top-center", theme: "dark" });
      navigate("/crudapp");
    }

}

  return (
  <><Navbar/>
    <div className="container ">
      <div className='d-flex justify-content-center'>
        <form className="mt-5 w-50">
          <div className='d-flex justify-content-center'>
            <Typography variant='h4'>Enter Your Details:</Typography>
          </div>
          <div>
            <div className="mb-2  col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                name="name"
                value={inpval.name}
                onChange={setdata}
                type="text"
                className="form-control "
                id="Name"
                placeholder={!errors?.name ? " " : errors?.name}
              />
            </div>
            
            <div className="mb-2   col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Username :
              </label>
              <input
                name="username"
                value={inpval.username}
                onChange={setdata}
                type="text"
                className="form-control"
                id="username"
                placeholder={!errors?.username ? " " : errors?.username}
              />
            </div>

            <div className="mb-2  col-12  ">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                name="email"
                value={inpval.email}
                onChange={setdata}
                type="email"
                className="form-control"
                id="Email"
                aria-describedby="emailHelp"
                placeholder={!errors?.email ? " " : errors?.email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-2   col-12 ">
              <label for="exampleInputPassword1" className="form-label">
              Create Password :
              </label>
              <input
                name="password"
                value={inpval.password}
                onChange={setdata}
                type="password"
                className="form-control"
                id="password"
                placeholder={!errors?.password ? " " : errors?.password}
              />
            </div>
            
            <div className="mb-2   col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                City
              </label>
              <select
                name="city"
                value={inpval.city}
                onChange={setdata}
                type="text"
                id="city"
                className="form-control"
                placeholder={!errors?.city? " " : errors?.city}
              >
                <option value="">--Please choose a city--</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Noida">Noida</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
            <div className="mb-2   col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Class
              </label>
              <select
                name="Class"
                value={inpval.Class}
                onChange={setdata}
                type="text"
                id="Class"
                className="form-control"
                placeholder={!errors?.Class ? " " : errors?.Class}
              >
                 <option value="">--Please choose a class--</option>
                  <option value="VII">VII</option>
                  <option value="VIII">VIII</option>
                  <option value="IX">IX</option>
                  <option value="X">X</option>
                  <option value="XI">XI</option>
                  <option value="XII">XII</option>
                </select>
            </div>
            <div className="mb-2   col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Section
              </label>
              <select
                name="section"
                value={inpval.section}
                onChange={setdata}
                type="text"
                id="section"
                className="form-control"
                placeholder={!errors?.section ? " " : errors?.section}
              >
                <option value="">--Please choose a section--</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className=' d-flex  justify-content-center'>
              <button type="submit" onClick={addinpdata} className="btn btn-primary mt-4">
                Sign up 
              </button>
              </div>
            </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signup;

