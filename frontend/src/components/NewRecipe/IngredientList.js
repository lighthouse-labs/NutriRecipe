import React from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IngredientItem from './IngredientItem';


const NewIngredientList = (props) => {
  let ingredients = [];
  if (props.ingredients) {
    ingredients = [].concat(props.ingredients);
  }
  return (
    <div className="NewIngredientList">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Fab color="primary" label="Add a new Ingredient"onClick={props.addIngredient}>
          <AddIcon />
        </Fab>
        {ingredients.map((ingredient, index) => {
          return (
            <IngredientItem 
              ingredient = {ingredient} 
              onDelete={()=>props.deleteIngredient(index)} 
              onChange={(e)=>props.handleChange(e,index)}
            />      
          )
        })}
      </Box>
    </div>
  )
}
export default NewIngredientList;