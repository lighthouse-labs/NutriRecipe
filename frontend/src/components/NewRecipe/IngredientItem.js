import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from "@mui/material";

const NewIngredientItem = (props) => {
  return (
    <div className="NewIngredientItem">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div> 
          <TextField
            required
            name="name"
            label="Ingredient"
            onChange={props.onChange}
            value={props.name}
            defaultValue={props.ingredient.name}
          />
          {/* <TextField
            required
            name="unit"
            label="Unit"
            onChange={props.onChange}
            value={props.ingredient.unit}
            defaultValue={props.ingredient.unit}
          /> */}
          <FormControl required variant="standard" sx={{ m: 1, minWidth: 350 }}>
            <InputLabel >Unit</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              required
              name="unit"
              onChange={props.onChange}
              value={props.unit}
            >
              <MenuItem value={"grams"}>grams</MenuItem>
              <MenuItem value={"milligrams"}>milligrams</MenuItem>
              <MenuItem value={"ounces"}>ounces</MenuItem>
              <MenuItem value={"tablespoons"}>tablespoons</MenuItem>
              <MenuItem value={"teaspoons"}>teaspoons</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            name="quantity"
            label="Quantity"
            onChange={props.onChange}
            value={props.quantity}
            defaultValue={props.ingredient.quantity}
          />
          <Fab color="primary" aria-label="Delete">
            <DeleteIcon onClick={props.onDelete}/>
          </Fab>
        </div>
        
      </Box>
    </div>
  )
}
export default NewIngredientItem;