import React, { useEffect, useState,useContext } from "react";
import { NavLink, useParams, useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

// import { updatedata } from "./Context/Contextprovider";

const Edit = () => {
  const [getstudentdata, setstudentdata] = useState([]);
  console.log(getstudentdata);


//  const { updata, setUpdata } = useContext(updatedata);

  const navigate=useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    Class: "",
    section: "",
  });

  const { id } = useParams("");
  console.log(id);

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const getdata = async () => {
    const res = await fetch(`http://localhost:8003/getstudent/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(res);

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updatestudent = async (e) => {
    e.preventDefault();

    const { name, email, address, city, Class, section } = inpval;

    const res2 = await fetch(`http://localhost:8003/updatestudent/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        city,
        Class,
        section,
      }),
    });

    const data2 = await res2.json();
    console.log(res2);

    if (res2.status === 4222 || !data2) {
      alert("fill the data");
    } else {
      // setUpdata(data2);
      navigate("/crudapp");
    }
    toast("updated!", { type: "success", position: "top-center", theme: "dark" });
  };

  

  return (
    <div>
      <Navbar/>
      <div className="container">
        <NavLink to="/">Home2</NavLink>
        <form className="mt-5">
          <div className="row">
            <div class="mb-2  col-lg-g col-md-6 col-12 ">
              <label for="exampleInputPassword1" class="form-label">
                Name
              </label>
              <input
                name="name"
                value={inpval.name}
                onChange={setdata}
                type="text"
                class="form-control"
                id="Name"
              />
            </div>
            <div class="mb-2  col-lg-6 col-md-6 col-12  ">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                name="email"
                value={inpval.email}
                onChange={setdata}
                type="email"
                class="form-control"
                id="Email"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-2   col-lg-6 col-md-6 col-12 ">
              <label for="exampleInputPassword1" class="form-label">
                Address
              </label>
              <input
                name="address"
                value={inpval.address}
                onChange={setdata}
                type="text"
                class="form-control"
                id="Address"
              />
            </div>
            <div className="mb-2   col-lg-6 col-md-6 col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                City
              </label>
              <input
                name="city"
                value={inpval.city}
                onChange={setdata}
                type="text"
                id="city"
                className="form-control"
                list="cityList"
              />
              <datalist id="cityList">
                <option value="Gurgaon"></option>
                <option value="Noida"></option>
                <option value="New Delhi"></option>
                <option value="Pune"></option>
                <option value="Chandigarh"></option>
                <option value="Mumbai"></option>
              </datalist>
            </div>
            <div className="mb-2   col-lg-6 col-md-6 col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Class
              </label>
              <input
                name="class"
                value={inpval.class}
                onChange={setdata}
                type="text"
                id="class"
                className="form-control"
                list="classList"
              />
              <datalist id="classList">
                <option value="VII"></option>
                <option value="VIII"></option>
                <option value="IX"></option>
                <option value="X"></option>
                <option value="XI"></option>
                <option value="XII"></option>
              </datalist>
            </div>
            <div className="mb-2   col-lg-6 col-md-6 col-12 ">
              <label for="exampleInputPassword1" className="form-label">
                Section
              </label>
              <input
                name="section"
                value={inpval.section}
                onChange={setdata}
                type="text"
                id="section"
                className="form-control"
                list="sectionList"
              />
              <datalist id="sectionList">
                <option value="A"></option>
                <option value="B"></option>
                <option value="C"></option>
                <option value="D"></option>
              </datalist>
            </div>
            <button
              onClick={updatestudent}
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
