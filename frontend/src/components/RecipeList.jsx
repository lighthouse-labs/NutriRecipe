// import React from "react"
import RecipeListItem from "./RecipeListItem";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import '../App.js'
import { Button } from "@mui/material";




export default function ResponsiveGrid(props) {


    
  const generateListArray = () => {
    let arrayOfRecipes = [];

    if (props.recipes.length === 1) {
      
       arrayOfRecipes = props.recipes.map((recipe, index) => {
          return ( <Grid item xs={12}>
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
          <Grid item xs={4} key={index}>
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
   <div>
     <Box>
        <Grid
        style={{padding : "5px 50px 10px 50px"}}
        container
        spacing={{ sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 5, md: 20 }}
      >
        {generateListArray()}
      </Grid>
    </Box>
  </div>
  );
}

