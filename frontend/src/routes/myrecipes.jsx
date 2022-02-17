import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import NavBar from '../components/NavBar';
import Form from '../components/NewRecipe/Form'
import Show from '../components/NewRecipe/Show'; // Recipe detail page
// import Show from '../RecipePage1'; // Recipe detail page
import Empty from '../components/RecipeList'; // Main page
import Status from '../components/NewRecipe/Status';
import Confirm from '../components/NewRecipe/Confirm';
import Error from '../components/NewRecipe/Error';
import useVisualMode from '../components/NewRecipe/hooks/useVisualMode';
import { useNavigate } from 'react-router';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Recipes from "./recipes";
import Dougnut from "../charts/Doughnut"
import RecipeList from "../components/RecipeList"
import Recipe from '../components/NewRecipe/index'
import RecipePage1 from '../components/RecipePage1'
import Alert from '../components/My Recipes/SimpleAlert'
import ConfirmAlert from "../components/My Recipes/ConfirmAlert";


const MyRecipes = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE_VALIDATION = "ERROR_SAVE_VALIDATION";
  const ERROR_LOAD = "ERROR_LOAD";

  const [myRecipes, setMyRecipes] = useState([]);
  const [selectRecipe, setSelectRecipe] = useState({});
  const { mode, transition, back } = useVisualMode(EMPTY);

  const fetchMyRecipes = (user) => {
    axios
      .get("/recipes") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        let myTempRecipes = response.data.filter(recipe => {
          if (recipe.user_id === user.id) {
            return recipe;
          }})
        console.log(myTempRecipes)
        setMyRecipes(myTempRecipes);
        console.log(myRecipes)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertRecipeToSaveDB = (recipeUI) => {
    let json_ingredients = JSON.stringify(recipeUI.ingredients);
    let recipeDB = {...recipeUI, "ingredients": json_ingredients};
    return recipeDB;
  }
  const convertRecipeToShowUI = (recipeDB) => {
    let string_ingredients = eval(recipeDB.ingredients);
    let recipeUI = {...recipeDB, "ingredients": string_ingredients};
    return recipeUI;
  }
  function destroyMyRecipe(recipe) {
    // transition(DELETING, true);
    console.log(`Deleting recipe id = ${recipe.id}`);
    axios
    .delete(`/recipes/${recipe.id}`, recipe)
    .then((response)=>{
      let tempRecipes = myRecipes.filter(tempRecipe => {
        if (tempRecipe.id !== recipe.id) {
          return tempRecipe;
        }
        setMyRecipes(tempRecipes);
      })})
    .catch(error => {
      console.log(error);
      transition(ERROR_DELETE);
    })
  }

  /******************************************* */
  //******* Hard Coded Session ************ */
  let user = {
    id: 1,
    username: "cody",
    email: "ubies@we.ly"
  };

  let comments = {
    id: 1,
    comment: "This is a great recipe (hardcoded)!",
    user_id: 1,
    recipe_id: 1
  }
  //***************************************** */
  useEffect (()=>{
    fetchMyRecipes(user)
  },[])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  
  return (
    <div>
      <NavBar />
      {!myRecipes || myRecipes.length === 0 && 
        <Alert 
            title={"No Recipe Found!"}
            content={"You have no recipe."}
            emph={"Let's create one now!"}
            url={"/newrecipe"}
        />}
      {myRecipes && <RecipeList 
        setSelectRecipe={setSelectRecipe} 
        recipes={myRecipes}
        user={user}
        onEdit={ <Recipe/>}
        onDelete={handleOpen}
        onView={<RecipePage1 selectRecipe={selectRecipe} comments={comments} user={props.user}/>}
      />}
     
    </div>
  )
}

export default MyRecipes;