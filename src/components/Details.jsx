import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardContent } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import download from "../download.png";
import { NavLink, useParams,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

const Details = () => {
  const { id } = useParams("");
  console.log(id);
  const navigate=useNavigate();

  const [studentData, setStudentData] = useState([]);

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
      setStudentData(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  },[]);

  const deletestudent = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deletestudent/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.staatus === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("data deleted");
      navigate("/crudapp");
    }
  };
  const notify_deleted= () => toast("deleted!", { type: "success", position: "top-center", theme: "dark" });
  
  return (
    <>
    <Navbar/>
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
              <NavLink to={`/edit/${id}`}>
              <button className="btn btn-primary mx-2">
                <EditIcon />
              </button>
            </NavLink>
            <button onClick={() => { deletestudent(id);notify_deleted() }} className="btn btn-danger">
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="leftview col-lg-6 col-md-6 col-12">
              <img src={download} style={{ width: 90 }} alt="profile picture" />
              <h3 className="mt-3">
                Name:<span> {studentData.name} </span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Email:<span> {studentData.email}</span>
              </p>
              <p className="mt-3">
                <HomeIcon /> Address: <span>{studentData.address}</span>
              </p>
            </div>
            <div className="rightview col-lg-6 col-md-6 col-12">
              <h3 className="mt-5">
                City:<span> {studentData.city}</span>
              </h3>
              <p className="mt-3">
                Class:<span> {studentData.Class}</span>
              </p>
              <p className="mt-3">
                Section: <span>{studentData.section}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default Details;
