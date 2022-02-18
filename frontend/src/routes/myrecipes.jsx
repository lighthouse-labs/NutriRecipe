import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import "../App.css";
import RecipePage1 from "../components/RecipePage1";
import Alert from '../components/My Recipes/SimpleAlert'
import ConfirmAlert from "../components/My Recipes/ConfirmAlert";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Recipes from "./recipes";

export default function MyRecipes(props) {
  const [myRecipes, setMyRecipes] = useState([]);
  const [selectRecipe, setSelectRecipe] = useState(null);
  const [comments,setComments] = useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const convertRecipeToSaveDB = (recipeUI) => {
  //   let json_ingredients = JSON.stringify(recipeUI.ingredients);
  //   let recipeDB = {...recipeUI, "ingredients": json_ingredients};
  //   return recipeDB;
  // }
  // const convertRecipeToShowUI = (recipeDB) => {
  //   let string_ingredients = eval(recipeDB.ingredients);
  //   let recipeUI = {...recipeDB, "ingredients": string_ingredients};
  //   return recipeUI;
  // }
  // function destroyMyRecipe(recipe) {
  //   // transition(DELETING, true);
  //   console.log(`Deleting recipe id = ${recipe.id}`);
  //   axios
  //   .delete(`/recipes/${recipe.id}`, recipe)
  //   .then((response)=>{
  //     let tempRecipes = myRecipes.filter(tempRecipe => {
  //       if (tempRecipe.id !== recipe.id) {
  //         return tempRecipe;
  //       }
  //       setMyRecipes(tempRecipes);
  //     })})
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }
  const fetchComments = ()=> {
    axios
      .get("/comments")
      .then((response) =>{
        setComments(response.data);
      })
      .catch((err) =>{
        console.log(err);
      })
  }
  useEffect(() => {
    fetchMyRecipes(props.user);
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  return (

    <main>
      <div style={{ display: "flex", flexDirection: "row" }}></div>
      {/* {console.log("COMMENTS__>",comments)} */}
      {/* {selectRecipe ? (
        <RecipePage1 selectRecipe={selectRecipe} comments={comments}/>
        
      ) : (
        <RecipeList setSelectRecipe={setSelectRecipe} recipes={myRecipes} />
      )} */}
      {/* {selectRecipe && <RecipePage1 
        selectRecipe={selectRecipe}
        comments={comments}
        user={props.user}
      />} */}
      {!selectRecipe && myRecipes.length === 0 && 
        <Alert 
          title={"No Recipe Found!"}
          content={"You have no recipe."}
          emph={"Let's create one now!"}
          url={"/newrecipe"}
      />}
      {!selectRecipe && myRecipes.length > 0 && 
        <>
          {/* <RecipeList 
            setSelectRecipe={setSelectRecipe}
            recipes={myRecipes}
            user={props.user}
          /> */}
          <Routes>
            <Route path="recipes" element={<Recipes user={props.user} recipes={myRecipes}/>} />      
          </Routes>
        </>
       

      }
    </main>
  );
}