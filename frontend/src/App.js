import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Button  from "./components/Button";
import Recipes from "./routes/recipes";
import Empty from "./components/NewRecipe/Empty"
import { Modal } from "@mui/material";
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
        console.log(data)
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
      {user && <NavBar logout={logout}  login_name={user.username} login_right={1} logout={logout} />}
      {!user && <NavBar login_name={""} signUp={showSignup} handleLoginOpen={handleLoginOpen} handleSignInOpen={handleSignInOpen} login={showLogin} login_right={1}  />}
      <div className="main">

        
        <Modal
          open={loginOpen}          
        >
          <Login handleLogin={handleLogin} cancel={handleLoginClose}></Login>

        </Modal>  
         <Modal
          open={signInOpen}          
        >
          <Signup handleLogin={handleLogin} cancel={handleSignInClose}></Signup>

        </Modal>  
        
     
      {<Recipes user={user}/>}

      </div>
    </div>
  );
};

export default App;