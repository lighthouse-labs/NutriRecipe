import React from "react"
import RecipeListItem from "./RecipeListItem";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import '../App.js'
import { Button } from "@mui/material";
import Fab from '@mui/material/Fab';

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
    <div>
      {props.user &&
       <Box
       sx={{
         flexGrow: 1,
         display: "flex",
         flexDirection: "row",
         justifyContent: "center",
         paddingTop: 3,
        }}
        >
       <Fab color="primary"label="Add your Recipe"onClick={props.onAdd}>
         <AddIcon />
       </Fab>
       </Box>
      }
      </div>
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
