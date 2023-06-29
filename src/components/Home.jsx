import React from 'react';
import { NavLink } from 'react-router-dom';
import {observer} from "mobx-react-lite";
import Navbar from './Navbar';

const HomePage = ({authStore}) => {
  return (
    // <h1>{<store.studentInfo>.email}-{store.studentInfo.password}</h1> this is used to fetch the email and password from Studentstore
    <>
    <Navbar/>
    <div className="bg-info-subtle d-flex flex-column align-items-center justify-content-center mt-2">
      <h1>Welcome!</h1>

      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <NavLink  to="/login" className="btn btn-primary mb-2 mt-3">Login</NavLink>
        <NavLink to="/signup" className="btn btn-primary mt-2">Signup</NavLink>
      </div>
    </div>
    </>
  );
};

export default HomePage;