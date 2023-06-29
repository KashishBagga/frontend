import { Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import authStore from "./AuthStore";





const Navbar = ({ search, handleSearchChange }) => {
     //
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                {['Home', 'Login', 'Sign Up'].map((text, index) => (
                    <ListItem button key={text} component={RouterLink} to={'/' + text.toLowerCase()}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    //

    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    console.log(searchTerm)
   
    const handleSearch = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setSearchTerm(e.target.value);
        //
        handleSearchChange(e.target.value);
        //
    };
  
   
    const handleLogout=(e)=>{
        localStorage.clear();
        authStore.isLoggedIn=false;
    }


    return (
        //
        <AppBar position="static" >
            <Toolbar>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        >
                            {drawer}
                        </Drawer>
                    </>
                ) : (
       
        
                        <nav className=" navbar  navbar-expand-lg  myCustomNavbarClass" style={{ backgroundColor: 'white' }} >


                <div className="container-fluid" >
                    <button
                        className="navbar-toggler "
                        type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li><NavLink to="/" className="nav-link"  href="#">Home</NavLink></li>
                            <li className="nav-item"><NavLink to="/login" className="nav-link" href="#">Login</NavLink></li>
                            <li className="nav-item"><NavLink to="/signup" className="nav-link" href="#">Sign Up</NavLink></li>
                        </ul>
                    </div>

                    <form className="d-flex" role="search">
                        <input 
                        className="form-control me-2" 
                         type="search"
                          placeholder="Search" 
                          aria-label="Search" 
                          //
                            value={search}
                            onChange={handleSearch}
                            //
                          />
                        <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/login' className="nav-link active ms-2" aria-current="page" href="#" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        </ul>
                    </form> 
    
                    <div >

                    

                    </div>
                </div>
                
                
            </nav>
      
    
               
                )}
            </Toolbar>
        </AppBar>
    );

};
export default Navbar;



