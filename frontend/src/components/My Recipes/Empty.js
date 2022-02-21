import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../../App.js'
import RecipeListItem from "../RecipeListItem";

export default function Empty(props) {

  const generateListArray = () => {
    let arrayOfRecipes = [];

    if (props.recipes.length === 1) {
      
       arrayOfRecipes = props.recipes.map((recipe, index) => {
          return ( <Grid item xs={18}>
            <RecipeListItem
              setSelectRecipe={props.setSelectRecipe}
              recipe={recipe}
              viewRecipe={props.viewRecipe}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              user={props.user}
              ratings={props.ratings}
              recipes={props.recipes}
            />
          </Grid>
          )
        }
        )
      } else {
        arrayOfRecipes = props.recipes.map((recipe, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <RecipeListItem
              setSelectRecipe={props.setSelectRecipe}
              recipe={recipe}
              viewRecipe={props.viewRecipe}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              user={props.user}
              ratings={props.ratings}
              recipes={props.recipes}
              />
         </Grid>
         
         ))
         
         
    }
    return arrayOfRecipes
  }
  return (
    <>
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 3,
      }}
      >
        
      <Grid
        container
        spacing={{ sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 5, md: 20 }}
        >
          {generateListArray()}
     
      </Grid>
    </Box>
</>
  );
}
