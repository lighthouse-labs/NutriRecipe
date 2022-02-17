import React,{useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { MenuItem } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import UploadImage from "./UploadImage";
import TextEditor from './TextEditor'
import IngredientList from "./IngredientList"

const Form = (props) => {
  const { recipe, setRecipe } = props;
  // const [recipe, setRecipe] = useState(props.recipe || {});

  const [ingredients, setIngredients] = React.useState([{name:"",unit:"",quantity:0}]);
  const addIngredient=()=>{
    setIngredients([...ingredients,{name:"",unit:"",quantity:0}]);
  };
  const deleteIngredient=(i)=>{
    let newIngredients = [...ingredients];
    newIngredients.splice(i,1);
    setIngredients(newIngredients);
  }
  let handleIngredients = (event, i) => {
    let newIngredients = [...ingredients];
    let newIngredient = {...newIngredients[i],[event.target.name]:event.target.value};
    newIngredients[i] = newIngredient;
    setIngredients(newIngredients);
    console.log(ingredients);
    let newRecipe = {...recipe,ingredients};
    setRecipe(newRecipe);
    console.log(recipe);
    let json_ingredients = JSON.stringify(recipe.ingredients);
      console.log(json_ingredients)
      console.log(recipe.ingredients)
  }
  
  const handleChange = (event) => {
    let newRecipe = {...recipe,[event.target.name]:event.target.value};
    setRecipe(newRecipe);
    console.log(recipe);
  }

  const categories=[].concat(props.cates);

  const [imageSelected, setImageSelected] = useState(recipe.image_url);

  const mode = props.mode;

  return (
    <div className="NewRecipe">
          <Typography sx={{ fontSize: 20 }}fontWeight="bold"align="center">{mode === "EDIT" ? "EDIT RECIPE" : "ADD A NEW RECIPE"}</Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontSize: 20 }}>General Information*</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '103ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField required name="name" label='Recipe name' variant="outlined" onChange={handleChange} defaultValue={recipe.name}/>
     
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '103ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField required name="description" label="Recipe Description" variant="outlined" onChange={handleChange} defaultValue={recipe.description}/>
          </Box>
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
            name="estimated_time"
            label="Time estimated (mins)"
            onChange={handleChange}
            defaultValue={recipe.estimated_time}
          />
          <TextField
            required
            name="serving_size"
            label="Serving size (people)"
            onChange={handleChange}
            defaultValue={recipe.serving_size}
          />
          <FormControl required variant="standard" sx={{ m: 1, minWidth: 350 }}>
            <InputLabel sx={{ fontSize: 18 }}>Category</InputLabel>
            <Select
              required
              name="category_id"
              //value={category}
              onChange={handleChange}
              label="Set a Category"
              value={categories[recipe.category_id]||undefined}
            >
              {categories.map(category =>
                <MenuItem value={category.id}>{category.name}</MenuItem>
              )}
             
            </Select>
          </FormControl>
        </div>
      </Box>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: 20 }}>Ingredient List*</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <IngredientList 
              recipe = {recipe}
              ingredients = {ingredients}
              addIngredient={addIngredient}
              deleteIngredient={deleteIngredient}
              handleChange={handleIngredients}
             /* defaultValue={recipe.ingredients} */
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: 20 }}>Steps to Make*</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <TextEditor
              multiline
              maxRows={100}
              variant="standard"
              recipe={recipe}
              defaultValue={recipe.steps}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      { recipe.image_url &&
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: 20 }}>Current Image</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Box > {/*}style={{ flex: "1 1 50%" }} */}
            <img src={recipe.image_url} alt="" width={500} height={300} mode='fit'/>
          </Box>
        </AccordionDetails>
      </Accordion>
      }
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
          {!recipe.image_url &&
          <Typography sx={{ fontSize: 20 }}>Upload an Image*</Typography>
          }
          { recipe.image_url &&
          <Typography sx={{ fontSize: 20 }}>Replace the current Image*</Typography>
          }
            </AccordionSummary>
          <AccordionDetails>
            <UploadImage 
              recipe={recipe}
              imageSelected={imageSelected}
              setImageSelected={setImageSelected}
            />
          </AccordionDetails>
          </Accordion>
    

      <Box display="flex" flex-direction="row" justifyContent="center" paddingTop={5}>
        <Stack direction="row" spacing={10} >
          <Button variant="contained" onClick={()=>props.onSave(recipe)}>Post your Recipe</Button>
         
        </Stack>
      </Box>
    
    </div>
  );
}
export default Form
