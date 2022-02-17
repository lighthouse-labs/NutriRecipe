import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import "../App.css";
import RecipePage1 from "../components/RecipePage1";

export default function Recipes(props) {
  const [recipes, setRecipes] = useState([]);
  const [selectRecipe, setSelectRecipe] = useState(props.selectRecipe || null);
  const [comments,setComments] = useState(props.comments || [])
  const fetchRecipes = () => {
    axios
      .get("/recipes") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        // console.log("response----->",response.data)
        setRecipes(response.data);
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
  console.log(props.selectRecipe);
  return (
    <main>
      <div style={{ display: "flex", flexDirection: "row" }}></div>
      {/* {console.log("COMMENTS__>",comments)} */}
      {selectRecipe ? (
        <RecipePage1 selectRecipe={selectRecipe} comments={comments} user={props.user}/>
        
      ) : (
        <RecipeList setSelectRecipe={setSelectRecipe} recipes={recipes} />
      )}
    </main>
  );
}