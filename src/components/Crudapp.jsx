import React, { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import authStore from "./AuthStore";

const Crudapp = () => {
  console.log(authStore.isLoggedIn)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [getstudentdata, setstudentdata] = useState([]);
  //
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  //

  const fetchData = async (page) => {
    console.log(page)
    try {
      const response = await fetch(`http://localhost:8003/getdata?page=${page}&limit=4`);
      const data3 = await response.json();
      console.log(data3);

      setTotalPages(data3.nbHits);
      setstudentdata(data3?.studentdata);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //

  
  useEffect(() => {
    console.log(getstudentdata)
    const filteredResults = getstudentdata.filter((element) =>
      element.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredResults)
    setFilteredData(filteredResults);
  }, [searchTerm, getstudentdata]);
//
useEffect(()=>{
  console.log(filteredData)
},[filteredData])
  const handleNextPage = () => {
    if (currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  const handleSkipPage = () => {
    const skipPage = parseInt(prompt('Enter page number to skip to:'), 10);

    if (skipPage >= 1 && skipPage <= totalPages) {
      setCurrentPage(skipPage);
    } else {
      alert('Invalid page number');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1);
  };



  useEffect(() => {
    // Fetch initial data and total pages
    fetchData(currentPage);
  }, [currentPage]);



  console.log(getstudentdata);
  const token = localStorage.getItem('jwtToken');
  const getdata = async (e) => {
    const res = await fetch("http://localhost:8003/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const data = await res.json();

    if (res.status === 404 || !data) {
      console.log("error");
    } else {
      setstudentdata(data?.studentdata);
      console.log("get data");
    }
  };
  const deletestudent = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deletestudent/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    const deletedata = await res2.json();
    console.log(deletedata);
    if (res2.staatus === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("data deleted");
      getdata();
    }
  };
  const notify = () => toast("deleted!", { type: "success", position: "top-center", theme: "dark" });

  return (

    <>
      <Navbar/>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/crudapp/register" className="btn btn-primary">
              Add Data
            </NavLink>
          </div>

          <table class="table">
            <thead>
              <tr class="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Class</th>
                <th scope="col">Section</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getstudentdata
              .filter((element)=>{
                return searchTerm.trim()===''
                ?element
                :element.name.toLowercase().includes(searchTerm);
              }).map((element, id) => {
                return (
                  <>
                    <tr key={element.id}>
                      <th scope="row">{4 * currentPage - 3 + id}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.address}</td>
                      <td>{element.city}</td>
                      <td>{element.Class}</td>
                      <td>{element.section}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          <button className="btn btn-primary">
                            <EditIcon />
                          </button>
                        </NavLink>
                        <button onClick={() => { deletestudent(element._id); notify() }} className="btn btn-danger">
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <p>Current Page: {currentPage}</p>
          <div className="d-flex justify-content-between">

            <div className=" mt-2 mb-2 ">
              <button className="btn btn-primary" onClick={handlePrevPage}>prev</button>
            </div>

            <div className=" d-flex">
              <div className=" mt-2 mb-2 ">
                <button className="btn btn-primary" onClick={handleSkipPage}>Skip</button>
              </div>
              <div className=" mt-2 mb-2 ">
                <button className="btn btn-primary ms-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Crudapp;


