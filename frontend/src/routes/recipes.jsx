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
  // change recipe to selectRecipe and setRecipe to setSeletRecipe
  const [recipes, setRecipes] = useState(props.recipes||[]);
  const [selectRecipe, setSelectRecipe] = useState(props.selectRecipe || null);
  const [comments,setComments] = useState(props.comments || [])
  const [ratings,setRatings] = useState([]);
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
        console.log("COMMENTS****----->",response.data)
      })
      .catch((err) =>{
        console.log(err);
      })

  }
  const fetchRatings = ()=> {
    axios
      .get("/ratings")
      .then((response) =>{
        console.log("ratings----->",response.data)
        setRatings(response.data);
      })
      .catch((err) =>{
        console.log(err);
      })

  }

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
   if (inputRecipe.name === null
    || inputRecipe.ingredients === null 
    || inputRecipe.category_id === null
    || inputRecipe.estimated_time === null
    || inputRecipe.description === null
    || inputRecipe.serving_size === null
    || inputRecipe.steps === null
    || inputRecipe.image_url === null
    ) {
      transition(ERROR_SAVE_VALIDATION, true);
    } else {
      transition(SAVING);
      inputRecipe.user_id = props.user.id
      let recipeDB = convertRecipeToSaveDB(inputRecipe);
      if (!selectRecipe.id) {
        axios
        .post("/recipes", recipeDB)
        .then((response) => {
          let tempRecipe = {...response.data};
          setSelectRecipe(()=>convertRecipeToShowUI(tempRecipe))
          console.log('recipe to show on UI after converted to string:',selectRecipe)
          transition(SHOW)
        })
        .catch(error => {
          console.log('error', error);
          transition(ERROR_SAVE, true);
        })
      } else {
        axios
        .put(`/recipes/${selectRecipe.id}`,selectRecipe)
        .then((response) => {
          let tempRecipe = {...response.data};
          setSelectRecipe(()=>convertRecipeToShowUI(tempRecipe));
          transition(SHOW)
        })
        .catch(error => {
          console.log('error', error);
          transition(ERROR_SAVE, true);
        })
      }
    }
  }

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

  useEffect(() => {
    fetchComments();
<<<<<<< HEAD
    fetchCategories();
=======
    fetchRatings();
>>>>>>> main
    if (!props.recipes) {
      fetchRecipes();
    }
  }, []);

  const { mode, transition, back } = useVisualMode(
    selectRecipe ? SHOW  : EMPTY
  );

  // return (
  //   <main>
  //     <div style={{ display: "flex", flexDirection: "row" }}></div>
  //     {/* {console.log("COMMENTS__>",comments)} */}
  //     {selectRecipe ? (
  //       <RecipePage1 
  //         selectRecipe={selectRecipe}
  //         comments={comments}
  //         user={props.user}
  //         viewRecipe={props.viewRecipe}
  //         onEdit={props.onEdit}
  //         onDelete={props.onDelete}
  //       />
  //     ) : (
  //       <RecipeList 
  //         setSelectRecipe={setSelectRecipe}
  //         recipes={recipes}
  //         user={props.user}
  //         viewRecipe={props.viewRecipe}
  //         onEdit={props.onEdit}
  //         onDelete={props.onDelete}
  //       />
  //     )}
  //   </main>
  // );

  return (
  
    <main>
<<<<<<< HEAD
      {mode === EMPTY && <Empty 
        viewRecipe={()=>transition(SHOW)}
        onEdit={()=>{transition(EDIT)}}
        onDelete={destroy}
        setSelectRecipe={setSelectRecipe}
        recipes={recipes}
        user={props.user}
        comments={comments}
      />}

      {mode === SHOW &&
        <Show
          selectRecipe={props.selectRecipe||{}}
          //selectRecipe={selectRecipe}
=======
      <div style={{ display: "flex", flexDirection: "row" }}></div>
      {/* {console.log("COMMENTS__>",comments)} */}
      {selectRecipe ? (
        <RecipePage1 fetchComments={fetchComments} selectRecipe={selectRecipe} comments={comments} user={props.user}ratings={ratings}/>
        
      ) : (
        <RecipeList 
>>>>>>> main
          setSelectRecipe={setSelectRecipe}
          user={props.user}
          recipes={recipes}
          comments = {comments}
          viewRecipe={props.viewRecipe}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>{
            console.log('view = Edit')
            transition(EDIT)
          }}
        />}

      {mode === CREATE && <Form cates={categories} 
        onCancel={back}
        onSave={saveRecipe}
        onDelete={destroy}
        setSelectRecipe={setSelectRecipe}
        selectRecipe={selectRecipe}
        />}
      {mode === SAVING && <Status message = {'Saving...'} />}
      {mode === DELETING && <Status message = {'Deleting...'} />}
      {mode === CONFIRM && <Confirm message = {'Delete? ... Really?'} onCancel={back} onConfirm={() => destroy(selectRecipe)}/>}
      {mode === EDIT && <Form cates={categories} selectRecipe={selectRecipe} onCancel={back} onSave={saveRecipe} onDelete={destroy} setSelectRecipe={setSelectRecipe} mode="EDIT"/>}
      {mode === ERROR_SAVE && <Error message={'Error saving encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={'Error deleting encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_SAVE_VALIDATION && <Error message={'Please fill data in all required fields (*)'} onClose={back} />}
      {mode === ERROR_LOAD && <Error message={'Error loading data encountered. Sorry!'} onClose={back} />}
    </main>
  )
}