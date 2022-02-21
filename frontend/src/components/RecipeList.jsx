// import React from "react"
import RecipeListItem from "./RecipeListItem";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function ResponsiveGrid(props) {
  console.log(props.ratings);
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
        padding: 5,
      }}
    >
      <Grid>
      <SearchBar 
          searchRecipe={props.searchRecipe}/>
      </Grid>
      <Grid
        container
        spacing={{ sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 5, md: 20 }}
      >
        {props.recipes.map((recipe, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <RecipeListItem
              setSelectRecipe={props.setSelectRecipe}
              recipe={recipe}
              onView={props.onView}
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

