import {useState, useEffect} from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    recipe:{},
    recipes:[],
    comments:[],
    ratings:[],
    categories:[]
  });
  const setRecipe = recipe => setState({ ...state, recipe });

  useEffect(()=>{Promise.all([
    axios.get('/recipes'),
    axios.get('/comments'),
    axios.get('/ratings'),
    axios.get('/categories'),
    ]).then(all=>{
      setState(prev =>({...prev, recipes:all[0].data, comments: all[1].data.comments, users: all[1].data.users, ratings: all[2].data, categories: all[3].data}))
    })},[]);

  const addRecipe = (inputRecipe, user) => {
    let recipe1 = {...inputRecipe};
    recipe1.user_id = user.id
    let json_ingredients = JSON.stringify(recipe1.ingredients);
    recipe1.ingredients = json_ingredients;
    if (!recipe1.id) {
      axios
      .post("/recipes", recipe1)
      .then((response) => {
        let recipe2 = response.data;
        let string_ingredients = eval(recipe2.ingredients);
        recipe2 = {...recipe2, ingredients:string_ingredients};
        setRecipe(recipe2);
        setState(...state, {recipe:recipe2})
        return Promise.resolve('Saved!');
      })
      .catch(error => {
        console.log('error saving Recipe:', error);
        setState(...state);
        return Promise.reject('Error Saving!');
      })
  }}

  const editRecipe = (inputRecipe) => {
    let recipe1 = {...inputRecipe};
    let json_ingredients = JSON.stringify(recipe1.ingredients);
    recipe1.ingredients = json_ingredients;
    if (recipe1.id) {
      axios
      .put(`/recipes/${recipe1.id}`, recipe1)
      .then((response) => {
        console.log(response);
        let recipe2 = {...response.data};
        let string_ingredients = eval(recipe2.ingredients);
        setRecipe(recipe2);
        setState({...state,recipe:recipe2})
        return Promise.resolve('Edited!');
      })
      .catch(error => {
        console.log('error', error);
        setState(...state);
        return Promise.reject('Error Editing!');
      })
    }}

  function destroy(recipe, user) {
    if (user.id = recipe.user_id){
    axios
    .delete(`/recipes/${recipe.id}`, recipe)
    .then((response) =>
      setState({...state, recipes:response.data});
      return Promise.resolve('Deleted!')
    .catch (e => {
      setState(...state);
      console.log(e);
      return Promise.reject('Error Saving!');
    })
  }



  return {
    state,
    setRecipe,
    addRecipe,
    editRecipe,
    destroy,
    addComment,
    addRating
  }
};