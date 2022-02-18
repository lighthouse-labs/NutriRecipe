import React, { Component, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Recipes from "./routes/recipes";
import { Modal, TextField } from "@mui/material";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NewRecipe from "./routes/newrecipe";
import MyRecipes from "./routes/myrecipes";


const App = (props) => {
  // Instantiation


  const [user, setUser] = useState({})
  const [show, setShow] = useState("")

  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [signInOpen, setSignInOpen] = useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false); 




  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token !== null){
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
    } else {
      setUser('');
    }
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  }  
  const logout = (e) => {
  e.preventDefault();
  setUser('');
  localStorage.removeItem("token");
    setShow('');
  }
  
  const showLogin = () => {
    setShow("Login")

  }
  
  const showSignup = () => {
    setShow("signUp")
  }

  const removeSignUp = () => {
    setShow("")
  }


  const renderForm = () => {
    if (show === 'Login') {
      return <Login handleLogin={handleLogin} cancel={removeSignUp} />
      
    } else if (show === 'signUp') {
      
      return <Signup handleLogin={handleLogin} cancel={removeSignUp}/>
    }
    else {
      
        return null
    }
      
  }

  return (
    <div className="App">
      {user && <NavBar logout={logout}   login_name={user.username} login_right={1} logout={logout} />}
      {!user && <NavBar login_name={""}  signUp={showSignup} handleLoginOpen={handleLoginOpen} handleSignInOpen={handleSignInOpen} login={showLogin} login_right={1}  />}
       <Modal open={loginOpen}>
          <Login handleLogin={handleLogin} cancel={handleLoginClose}></Login>
        </Modal>  
         <Modal
          open={signInOpen}          
        >
          <Signup handleLogin={handleLogin} cancel={handleSignInClose}></Signup>

        </Modal>
      <div className="main">
        {/* <Search />         */}
        {/* <Recipes /> */}
      <Routes>
        <Route path="/" element={<Recipes user={user} />} />
        <Route path="recipes" element={<Recipes user={user}/>} />      
        <Route path="newrecipe" element={<NewRecipe user={user} />} />
        <Route path="myrecipes" element={<MyRecipes user={user} />} />
      {/* {token && <Route path="secret" element={<Secret />}/>} */ }
    </Routes>
        <Outlet/>
      </div>
    </div>
  );
};
export default App;