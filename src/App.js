
import './App.css';
//importing bootstrap css and js files
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

//importing components
import Crudapp from './components/Crudapp';
import Register from './components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Edit from './components/Edit';
import Details from './components/Details';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import authStore from './components/AuthStore';
import { useEffect } from 'react';




function App() {

  
  const check = () => {
    console.log(authStore.isLoggedIn)
    return authStore.isLoggedIn ? <Crudapp /> : <Login />
  }

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        {<Route exact path='/crudapp' element={check()} authStore={authStore} />}
        <Route exact path='/crudapp/register' element={<Register />} authStore={authStore} />
        <Route exact path='/crudapp/edit/:id' element={<Edit />} authStore={authStore} />
        <Route exact path='/crudapp/view/:id' element={<Details />} authStore={authStore} />
      </Routes>
    </>
  );
}

export default App;
