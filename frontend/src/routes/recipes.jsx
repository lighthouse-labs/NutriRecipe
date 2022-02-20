import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import RecipeList from "../components/RecipeList"; // Main page
import "../App.css";
//import RecipePage1 from "../components/RecipePage1"; // Recipe detail page
import Form from '../components/NewRecipe/Form'
import Empty from '../components/RecipeList'; // Main page
import Show from "../components/RecipePage1"; // Recipe detail page
import Status from '../components/NewRecipe/Status';
import Confirm from '../components/NewRecipe/Confirm';
import Error from '../components/NewRecipe/Error';
import useVisualMode from '../components/NewRecipe/hooks/useVisualMode';

export default function Recipes(props) {
  const [recipes, setRecipes] = useState(props.recipes || []);
  const [selectRecipe, setSelectRecipe] = useState(props.selectRecipe || null);
  const [comments, setComments] = useState(props.comments || []);
  const [ratings, setRatings] = useState([]);
  const [filterlist, setFilterList]=useState([]);
  console.log("recipies",recipes);

  const fetchRecipes = () => {
    axios
      .get("/recipes")
      .then((response) => {
        //console.log("response----->", response.data);
        setRecipes(response.data);
        setFilterList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchRecipe = (query) => {
    
    setFilterList(recipes.filter((recipe) => {
      if (recipe.name.toLowerCase().includes(query.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    }));
  };

  const fetchComments = () => {
    axios
      .get("/comments")
      .then((response) => {
        setComments(response.data);
        // console.log("COMMENTS****----->", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRatings = () => {
    axios
      .get("/ratings")
      .then((response) => {
        console.log("ratings----->", response.data);
        setRatings(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchComments();
    fetchCategories();
    fetchRatings();
    if (!props.recipes) {
      fetchRecipes();
    }
  }, []);

  console.log(props.selectRecipe);

  return (
  
    <main>
      <div style={{ display: "flex", flexDirection: "row" }}></div>
      {selectRecipe ? (
        <RecipePage1
          fetchComments={fetchComments}
          selectRecipe={selectRecipe}
          comments={comments}
          user={props.user}
          ratings={ratings}
          setSelectRecipe={setSelectRecipe}
        />
      ) : (
        <RecipeList
          setSelectRecipe={setSelectRecipe}
          recipes={filterlist}
          user={props.user}
          viewRecipe={props.viewRecipe}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          ratings={ratings}
          
          searchRecipe={searchRecipe}
        />
      )}
    </main>
  );
}
