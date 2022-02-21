import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "../SearchBar";
import '../../App.js';
import RecipeListItem from "../RecipeListItem";

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
              onDelete={() => props.onDelete(recipe)}
              onEdit={() => props.onEdit(recipe)}
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
              onDelete={() => props.onDelete(recipe)}
              onEdit={() => props.onEdit(recipe)}
              user={props.user}
              ratings={props.ratings}
              recipes={props.recipes}
              />
         </Grid>
         
         ))
         
         
    }
    return arrayOfRecipes
  }
      
  

      
    
  const renderSearch = () => {
    if (props.openSearch !== false) {
      return <SearchBar 
        searchRecipe={props.searchRecipe} closeSearch={ props.closeSearch}/>
    } else {
      return (
        <Button variant="contained" onClick={props.showSearch}>Search Recipes</Button>
      )
      }
  }

  return (
    <div className="search-location">
      {props.user &&
       <Box
       sx={{
         flexGrow: 1,
         display: "flex",
         flexDirection: "row",
         //justifyContent: "left",
         paddingTop: 3,
       }}
     >
       <Fab color="primary"label="Add your Recipe"onClick={props.onAdd}>
         <AddIcon />
       </Fab>
       </Box>
      }
      <br></br>
      {renderSearch()}
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 5,
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
  </div>
  );
}
