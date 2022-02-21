import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from '../components/NewRecipe/Form'
import Show from '../components/RecipePage1'; // Recipe detail page
// import Show from '../components/NewRecipe/Show'; // Recipe detail page
// import Empty from '../components/RecipeList'; // Main page
import Empty from '../components/My Recipes/Empty'
import Status from '../components/NewRecipe/Status';
import Confirm from '../components/My Recipes/Confirm';
import Error from '../components/NewRecipe/Error';
import useVisualMode from '../components/NewRecipe/hooks/useVisualMode';
import { convertToRaw } from 'draft-js';
import { Button } from "@mui/material"; 
import Fab from '@mui/material/Fab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function MyRecipes(props) {
  const EMPTY = "EMPTY";
  const NONE = "NONE";
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
  const [ratings, setRatings] = useState([]);

  
  const user = props.user;
  const [filterlist, setFilterList] = useState([]);
  const [openSearch, setOpenSearch] = React.useState(false);
  const showSearch = () => setOpenSearch(true);
  const closeSearch = () => {
    setOpenSearch(false);
    setFilterList(recipes);
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

  // const converRTEtoShowUI = (RTEtext) => {
  //   // const content = RTEtext.getCurrentContent().getPlainText();
  //   const content = JSON.stringify(convertToRaw(RTEtext))
  //   console.log (content);
  //   return content;
  // }

  const convertRecipeToSaveDB = (recipeUI) => {
    let json_ingredients = JSON.stringify(recipeUI.ingredients);
    let recipeDB = {...recipeUI, "ingredients": json_ingredients};
    return recipeDB;
  }

  const convertRecipeToShowUI = (recipeDB) => {
    let string_ingredients = eval(recipeDB.ingredients);
    let recipeUI = {...recipeDB, "ingredients": string_ingredients};
    // if (recipeDB.id > 10) {
    //   let steps_text = converRTEtoShowUI(recipeDB.steps);
    //   recipeUI = {...recipeDB, "steps": steps_text};
    // }

    return recipeUI;
  }


  const fetchMyRecipes = (user) => {
    if(!user) {
      return
    }
    axios
      .get("/recipes")
      .then((response) => {
        // handle success
        let filtered = response.data.filter(recipe => {
          if (recipe.user_id === user.id) {
            return recipe;
          }
        });
        let converted = filtered.map(recipe => {
          let temp_recipe = convertRecipeToShowUI(recipe);
            return temp_recipe;
        })
        setRecipes(converted);
        transition(EMPTY);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const fetchRatings = ()=> {
    axios
      .get("/ratings")
      .then((response) =>{
        setRatings(response.data);
      })
      .catch((err) =>{
        console.log(err);
      })
  }

  const saveRecipe = (inputRecipe) => {
   if (!inputRecipe
    || inputRecipe.name === null
    || !inputRecipe.ingredients
    || inputRecipe.ingredients.indexOf([{name:"",unit:"",quantity:0}]) >= 0
    || inputRecipe.category_id === null
    || inputRecipe.estimated_time === null
    || inputRecipe.description === null
    || inputRecipe.serving_size === null
    || inputRecipe.steps === null
    || inputRecipe.image_url === null
    ) {
      setRecipe(inputRecipe);
      transition(ERROR_SAVE_VALIDATION, false);
    } else {
      transition(SAVING);
      inputRecipe.user_id = props.user.id
      let recipeDB = convertRecipeToSaveDB(inputRecipe);
      console.log("recipe before saving to DB:",recipeDB)
      if (!recipe) {
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
        console.log('edited recipe before sending to DB:', recipe);
        axios
        .put(`/recipes/${recipe.id}`,recipeDB)
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

  function destroy(recipe, user) {
    transition(DELETING, true);
    console.log(`Deleting recipe id = ${recipe.id}`);
    axios
    .delete(`/recipes/${recipe.id}`, recipe)
    .then((response)=>{
      let filtered = response.data.filter(recipe => {
        if (recipe.user_id === user.id) {
          let temp_recipe = convertRecipeToShowUI(recipe);
          return temp_recipe;
        }
      })
      console.log(filtered);
      setRecipes(filtered);
      transition(EMPTY)
    })
    .catch(error => {
      console.log(error);
      transition(ERROR_DELETE);
    })
  }

    const viewRecipe = (recipe) => {
    setRecipe(recipe);
    transition(SHOW);
  }

  const editRecipe = (recipe) => {
    setRecipe(recipe);
    transition(EDIT);
  }

  const confirmRecipe = (recipe) => {
    setRecipe(recipe);
    transition(CONFIRM);
  }

  const addRecipe = () => {
    setRecipe(null);
    transition(CREATE);
  }

  useEffect (()=>{
    fetchMyRecipes(user);
  },[user]);

  useEffect (()=>{
    fetchCategories();
    fetchComments();
    fetchRatings();
  }, []);


  const { mode, transition, back } = useVisualMode(props.mode);
  
  return (
  
    <div>
      {props.user &&
       <div>
       <Box
       sx={{
         flexGrow: 1,
         display: "flex",
         flexDirection: "row",
         justifyContent: "center",
         padding: 5,
        }}
        >
       <Fab color="primary"label="Add your Recipe"onClick={() => addRecipe()}>
         <AddIcon />
       </Fab>
       </Box>
       </div>
      }
      {mode === EMPTY && <Empty
        viewRecipe={viewRecipe}
        onEdit={editRecipe}
        onDelete={confirmRecipe}
        onAdd={addRecipe}
        setSelectRecipe={setRecipe}
        recipes={recipes}
        user={props.user}
        comments = {comments}
        ratings={ratings}
        searchRecipe={searchRecipe}
        closeSearch={closeSearch}
        showSearch={showSearch}
        openSearch={openSearch}
      />}
      {mode === SHOW &&
        <Show
          selectRecipe={recipe}
          user={props.user}
          onEdit={editRecipe}
          onDelete={confirmRecipe}
          comments = {comments}
          ratings={ratings}
        />
        }
      {mode === CREATE && 
        <Form 
          cates={categories}
          onCancel={back}
          onSave={saveRecipe}
          ratings={ratings}
          setRecipe={setRecipe}
        />
      }
      {mode === SAVING && <Status message = {'Saving...'} />}
      {mode === DELETING && <Status message = {'Deleting...'} />}
      {mode === CONFIRM && <Confirm title = "Delete?" message = {'Looks like a great recipe.\nAre you sure?'} user={user} onCancel={back} onConfirm={() => destroy(recipe,user)}/>}
      {mode === EDIT && <Form 
        cates={categories}
        ratings={ratings}
        recipe={recipe}
        setRecipe={setRecipe}
        onCancel={back}
        onSave={saveRecipe}
      />}
      {mode === ERROR_SAVE && <Error message={'Error saving encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={'Error deleting encountered. Sorry!'} onClose={back} />}
      {mode === ERROR_SAVE_VALIDATION && <Error message={'Please fill data in all required fields (*)'} onClose={back} />}
      {mode === ERROR_LOAD && <Error message={'Error loading data encountered. Sorry!'} onClose={back} />}
    </div>
  )
}
