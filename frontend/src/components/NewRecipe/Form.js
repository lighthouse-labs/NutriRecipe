import React,{useState, useEffect} from "react";
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
  const { selectRecipe, setSelectRecipe } = props;
  const [ingredients, setIngredients] = React.useState(props.selectRecipe.ingredients || [{name:"",unit:"",quantity:0}]);
  
  //const [steps, setSteps] = React.useState(props.selectRecipe.steps ||'');

  const setSteps=(steps)=>{
    setSelectRecipe({...selectRecipe,steps})
  }

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
    setIngredients(newIngredients); //issue 
    let newRecipe = {...selectRecipe,ingredients};
    setSelectRecipe(newRecipe)
    let json_ingredients = JSON.stringify(selectRecipe.ingredients);
  }
  
  const handleChange = (event) => {
    let newRecipe = {...selectRecipe,[event.target.name]:event.target.value};
    setSelectRecipe(newRecipe, ()=>console.log(selectRecipe));
  }

  const categories=[].concat(props.cates);

  const [imageSelected, setImageSelected] = useState(selectRecipe.image_url)
  // const [category, setCategory] = React.useState(selectRecipe.category_id);

  

  useEffect(()=>{
    let newRecipe = {...selectRecipe,ingredients};
    setSelectRecipe(newRecipe)
  },[ingredients]);

  const mode = props.mode;

  return (
    <div className="NewRecipe">
          <Typography sx={{ fontSize: 20 }}fontWeight="bold"align="center">{mode==="EDIT" ? "EDIT RECIPE" : "ADD A NEW RECIPE"}</Typography>
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
            <TextField required name="name" label='Recipe name' variant="outlined" onChange={handleChange} defaultValue={selectRecipe.name}/>
     
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '103ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField required name="description" label="Recipe Description" variant="outlined" onChange={handleChange} defaultValue={selectRecipe.description}/>
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
            defaultValue={selectRecipe.estimated_time}
          />
          <TextField
            required
            name="serving_size"
            label="Serving size (people)"
            onChange={handleChange}
            defaultValue={selectRecipe.serving_size}
          />
          <FormControl required variant="standard" sx={{ m: 1, minWidth: 350 }}>
            <InputLabel sx={{ fontSize: 18 }}>Category</InputLabel>
            <Select
              required
              name="category_id"
              // value={category}
              value={selectRecipe.category_id}
              onChange={handleChange}
              label="Set a Category"
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
              selectRecipe = {selectRecipe}
              ingredients = {ingredients}
              addIngredient={addIngredient}
              deleteIngredient={deleteIngredient}
              handleChange={handleIngredients}
             /* defaultValue={selectRecipe.ingredients} */
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
              steps={selectRecipe.steps}
              setSteps={setSteps}
              name="steps"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      { selectRecipe.image_url &&
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
            <img src={selectRecipe.image_url} alt="" width={500} height={300} mode='fit'/>
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
          {!selectRecipe.image_url &&
          <Typography sx={{ fontSize: 20 }}>Upload an Image*</Typography>
          }
          { selectRecipe.image_url &&
          <Typography sx={{ fontSize: 20 }}>Replace the Current Image*</Typography>
          }
            </AccordionSummary>
          <AccordionDetails>
            <UploadImage 
              selectRecipe={selectRecipe}
              imageSelected={imageSelected}
              setImageSelected={setImageSelected}
            />
          </AccordionDetails>
          </Accordion>
    

      <Box display="flex" flex-direction="row" justifyContent="center" paddingTop={5}>
        <Stack direction="row" spacing={10} >
          <Button variant="contained" onClick={()=>props.onSave(selectRecipe)}>Save your Recipe</Button>
          <Button variant="contained" onClick={props.onCancel}>Cancel</Button>
        </Stack>
      </Box>
    
    </div>
  );
}
export default Form
