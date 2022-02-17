import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from '../components/NewRecipe/Form'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router';
import Recipe from '../components/NewRecipe/index'

const NewRecipe = (props) => {
 
  return (
    <main>
      <Recipe mode={"CREATE"} user={props.user}/>
      {/*<Form saveRecipe ={saveRecipe} cates={categories} recipe={props.recipe || {}}/>*/}
    </main>
  );
}
export default NewRecipe