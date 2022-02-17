import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import "../App.css";
import RecipePage1 from "../components/RecipePage1";

export default function MyRecipes() {
  const [myrecipes, setMyRecipes] = useState([]);
  const [selectRecipe, setSelectRecipe] = useState(null);
  const [comments,setComments] = useState([])
  const fetchRecipes = () => {
    axios
      .get("/recipes") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        // console.log("response----->",response.data)
        setMyRecipes(response.data);
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
      {selectRecipe ? (
        <RecipePage1 selectRecipe={selectRecipe} comments={comments}/>
        
      ) : (
        <RecipeList setSelectRecipe={setSelectRecipe} recipes={recipes} />
      )}
    </main>
  );
}