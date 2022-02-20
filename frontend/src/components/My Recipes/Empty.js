// import React from "react"
import RecipeListItem from "../RecipeListItem";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavBar from "../NavBar";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const styles = {
  paperContainer: {
      height: "1000",
      backgroundImage: `url(${"https://res.cloudinary.com/de6puygvt/image/upload/v1645342161/recipes/wood-table-top-blur-kitchen-counter-room-background_254791-1293_zrvkre.jpg"})`
  }
};

export default function Empty(props) {
  return (
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
        {props.recipes.map((recipe, index) => (
          <Grid item xs={7} sm={7} md={10} key={index}>
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
        ))}
      </Grid>
    </Box>
</div>
  );
}