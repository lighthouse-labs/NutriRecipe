import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import "../App.css";
import RecipePage1 from "../components/RecipePage1";
import Alert from '../components/MyRecipes/SimpleAlert'

export default function MyRecipes(props) {
  const [myRecipes, setMyRecipes] = useState([]);
  const [selectRecipe, setSelectRecipe] = useState(null);
  const [comments,setComments] = useState([])
  const fetchRecipes = () => {
    axios
      .get("/recipes") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        let myTempRecipes = response.data.filter(recipe => {
          if (recipe.user_id === props.user.id) {
            return recipe;
          }})
        console.log(myTempRecipes)
        setMyRecipes(myTempRecipes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    fetchRecipes();
    fetchComments();
  }, []);
  return (
    <main>
      <div style={{ display: "flex", flexDirection: "row" }}></div>
      {/* {console.log("COMMENTS__>",comments)} */}
   
      <RecipeList setSelectRecipe={setSelectRecipe} recipes={myRecipes} user={props.user} />
      {!myRecipes || myRecipes.length === 0 && 
        <Alert 
            title={"No Recipe Found!"}
            content={"You have no recipe."}
            emph={"Let's create one now!"}
            url={"/newrecipe"}
        />}
    </main>
  );
}