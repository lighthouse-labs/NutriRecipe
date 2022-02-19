import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from '../components/NewRecipe/Form'
// import Show from '../components/NewRecipe/Show'; // Recipe detail page
import Show from '../components/RecipePage1'; // Recipe detail page
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

export default function Recipe(props) {
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

  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchCategories = () => {
    axios
    .get("/categories")
    .then((response) => {
      setCategories(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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

  const fetchRecipes = () => {
    axios
      .get("/recipes") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRecipe = (id) => {
    axios
      .get(`/recipes/${id}`)
      .then((response) => {
        console.log(response.data[0].name); // The entire response from the Rails API
        props.setRecipe(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertRecipeToSaveDB = (recipeUI) => {
    let json_ingredients = JSON.stringify(recipeUI.ingredients);
    let recipeDB = {...recipeUI, "ingredients": json_ingredients};
    // let string_steps = String(recipeUI.steps);
    // recipeDB = {...recipeUI, "steps": string_steps};
    return recipeDB;
  }
  const convertRecipeToShowUI = (recipeDB) => {
    let string_ingredients = eval(recipeDB.ingredients);
    let recipeUI = {...recipeDB, "ingredients": string_ingredients};
  //  // let string_steps=String(recipeDB.steps);
  //   recipeUI = {...recipeDB, "steps": string_steps};
    return recipeUI;
  }

  const saveRecipe = (inputRecipe) => {
   if (recipe.name === null
    || recipe.ingredients === null 
    || recipe.category_id === null
    || recipe.estimated_time === null
    || recipe.description === null
    || recipe.serving_size === null
    || recipe.steps === null
    || recipe.image_url === null
    ) {
      transition(ERROR_SAVE_VALIDATION, true);
    } else {
      transition(SAVING);
      inputRecipe={...recipe};
      inputRecipe.user_id = props.user.id
      let recipeDB = convertRecipeToSaveDB(inputRecipe);
      if (!recipe.id) {
        axios
        .post("/recipes", recipeDB)
        .then((response) => {
          let tempRecipe = {...response.data};
          setRecipe(()=>convertRecipeToShowUI(tempRecipe))
          console.log('recipe to show on UI after converted to string:',recipe)
          transition(SHOW)
        })
        .catch(error => {
          console.log('error', error);
          transition(ERROR_SAVE, true);
        })
      } else {
        axios
        .put(`/recipes/${recipe.id}`,recipe)
        .then((response) => {
          let tempRecipe = {...response.data};
          setRecipe(()=>convertRecipeToShowUI(tempRecipe));
          transition(SHOW)
        })
        .catch(error => {
          console.log('error', error);
          transition(ERROR_SAVE, true);
        })
      }
      
    }
  }

  const { mode, transition, back } = useVisualMode(
    Object.keys(recipe).length > 0 ? SHOW  : CREATE
  );

  function destroy(recipe) {
    transition(DELETING, true);
    console.log(`Deleting recipe id = ${recipe.id}`);
    axios
    .delete(`/recipes/${recipe.id}`, recipe)
    .then((response)=>{
      let tempRecipes = response.data.map(recipe => {
        let temp_recipe = convertRecipeToShowUI(recipe);
        return temp_recipe;
      });
      console.log(tempRecipes);
      setRecipes(tempRecipes)
      transition(EMPTY);


    })
    .catch(error => {
      console.log(error);
      transition(ERROR_DELETE);
    })
  }

  useEffect (()=>{
    fetchCategories();
    fetchComments();
  },[]);

  return (
  
    <div>
      {mode === EMPTY && <Empty 
        viewRecipe={()=>transition(SHOW)}
        onEdit={()=>{transition(EDIT)}}
        onDelete={destroy}
        setSelectRecipe={setRecipe}
        recipes={recipes}
        user={props.user}
      />}
      {mode === SHOW &&
        <Show
          // selectRecipe={props.recipe}
          selectRecipe={recipe}
          user={props.user}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>{
            console.log('view = Edit')
            // console.log(props.recipe);
            transition(EDIT)
          }}
          comments = {comments}
        />}
        { /*   <Recipes 
        //     selectRecipe={recipe}
        //     onDelete={()=>transition(CONFIRM)}
        //     onEdit={()=>{transition(EDIT)}}
        //     user={props.user}
        //     comments={comments}
        //   />
        // </div>} */ }
      {mode === CREATE && <Form cates={categories} onCancel={back} onSave={saveRecipe} onDelete={destroy} setRecipe={setRecipe} recipe={recipe}/>}
      {mode === SAVING && <Status message = {'Saving...'} />}
      {mode === DELETING && <Status message = {'Deleting...'} />}
      {mode === CONFIRM && <Confirm message = {'Delete? ... Really?'} onCancel={back} onConfirm={() => destroy(recipe)}/>}
      {mode === EDIT && <Form cates={categories} recipe={recipe} onCancel={back} onSave={saveRecipe} onDelete={destroy} setRecipe={setRecipe} mode="EDIT"/>}
      {mode === ERROR_SAVE && <Error message={'Error saving encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={'Error deleting encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_SAVE_VALIDATION && <Error message={'Please fill data in all required fields (*)'} onClose={back} />}
      {mode === ERROR_LOAD && <Error message={'Error loading data encountered. Sorry!'} onClose={back} />}
    </div>
  )
}