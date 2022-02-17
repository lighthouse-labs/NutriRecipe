import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from './Form'
// import Show from './Show'; // Recipe detail page
import Show from '../RecipePage1'; // Recipe detail page
import Empty from '../RecipeList'; // Main page
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from './hooks/useVisualMode';
import { useNavigate } from 'react-router';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Recipes from "../../routes/recipes";

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

  const fetchCategories = () => {
    axios
    .get("/categories")
    .then((response) => {
      setCategories(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
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

  const saveRecipe = (inputrecipe) => {/*
   if (recipe.name === '' 
    || recipe.ingredients === null 
    || recipe.category_id === ''
    || recipe.estimated_time
    || recipe.description ===''
    || recipe.serving_size === ''
    || recipe.steps === ''
    || recipe.image_url === ''
    ) {
      transition(ERROR_SAVE_VALIDATION);
    } else {*/
      let recipe = {...inputrecipe};
      recipe.user_id = 1 //hard-coded
      transition(SAVING);
      let json_ingredients = JSON.stringify(recipe.ingredients);
      recipe.ingredients = json_ingredients;
      if (!recipe.id) {
        axios
        .post("/recipes", recipe)
        .then((response) => {
          console.log(response);
          recipe = {...response.data};
          console.log(recipe);
          let string_ingredients = eval(recipe.ingredients);
          console.log(string_ingredients);
          console.log(string_ingredients.class);
          console.log ('Create mode - Recipe saved!');
          setRecipe(recipe);
          transition(SHOW)
          console.log('POST mode', mode)
        })
        .catch(error => {
          console.log('error', error);
          transition(ERROR_SAVE, true);
        })
      } else {
        axios
        .put(`/recipes/:${recipe.id}`, recipe)
        .then((response) => {
          console.log(response);
          recipe = {...response.data};
          console.log(recipe);
          let string_ingredients = JSON.parse(recipe.ingredients);
          console.log(string_ingredients);
          console.log(string_ingredients.class);
          console.log ('Edit mode - Recipe saved!');
          setRecipe(recipe);
          transition(SHOW)
          console.log('POST mode', mode)
        })
        .catch(error => {
          console.log('error', error);
          transition(ERROR_SAVE, true);
        })
      }
      
    /*}*/
  }

  const { mode, transition, back } = useVisualMode(
    Object.keys(recipe).length > 0 ? SHOW  : CREATE
  );


  function destroy(recipe) {
    transition(DELETING, true);
    console.log(`Deleting recipe id = ${recipe.id}`);
    axios
    .delete(`/recipes/:${recipe.id}`, recipe)
    .then(
      fetchRecipes()
      .then(response => {
        setRecipes(response.data)
        transition(EMPTY)
      })
      .catch (e => {
        console.log(e);
        transition(ERROR_LOAD)
      })
    )
    .catch(error => {
      console.log(error);
      transition(ERROR_DELETE);
    })
  }

  useEffect (()=>{
    fetchCategories()
  },[])
  console.log('recipe', recipe)
  console.log('mode === SHOW ', mode === SHOW )
  console.log(mode);
  console.log('user is', props.user);
  return (
  
    <div>
     
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} onEdit={()=>{transition(EDIT)}} onDelete={destroy}/>}
      {mode === SHOW && (
       
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
        />
      )}
      {mode === CREATE && <Form cates={categories} onCancel={back} onSave={saveRecipe} onDelete={destroy} setRecipe={setRecipe} recipe={recipe} mode={mode}/>}
      {mode === SAVING && <Status message = {'Saving...'} />}
      {mode === DELETING && <Status message = {'Deleting...'} />}
      {mode === CONFIRM && <Confirm message = {'Delete? ... Really?'} onCancel={back} onConfirm={(recipe) => destroy(recipe)}/>}
      {mode === EDIT && <Form cates={categories} recipe={recipe} onCancel={back} onSave={saveRecipe} onDelete={destroy} mode={mode} setRecipe={setRecipe} recipe={recipe}/>}
      {mode === ERROR_SAVE && <Error message={'Error saving encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={'Error deleting encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_SAVE_VALIDATION && <Error message={'Please fill data in all required fields (*)'} onClose={back} />}
      {mode === ERROR_LOAD && <Error message={'Error loading data encountered. Sorry!'} onClose={back} />}
    </div>
  )
}