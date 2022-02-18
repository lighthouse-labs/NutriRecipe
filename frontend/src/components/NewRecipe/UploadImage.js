import React,{useState, useEffect} from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';


const Upload = (props) => {
  let image_url="";
  const uploadImage = (files) => {
    if (props.imageSelected !=="") {
      const formData = new FormData();
      formData.append("file",props.imageSelected);
      formData.append("upload_preset", "ish6rtjw")
      console.log(files);
      axios.post(
        "https://api.cloudinary.com/v1_1/de6puygvt/image/upload"
        ,formData
      ).then((response)=>{
        console.log(response.data.url);
        image_url=response.data.url;
        props.selectRecipe.image_url=image_url;
        setLoading(false);
        props.setImageSelected("")
      });
    }
  }
 
  const [loading, setLoading] = React.useState(false);
  function handleLoading() {
    if (props.imageSelected!==null) {
      setLoading(true);
      uploadImage();
    } else {
      setLoading(false);
    }
  }
 
  return (
    <div className="upload">
      <Accordion>
        {/* <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        </AccordionSummary> */}
        <AccordionDetails >
          <TextField
            sx={{ m: 1, width: 500 }}
            type="file"
            onChange={(event)=>{
              props.setImageSelected(event.target.files[0]);
            }}
          />
          <LoadingButton
            color="primary"
            sx={{m:2}}
            onClick={handleLoading}
            loading={loading}
            loadingPosition="start"
            startIcon={<CloudUploadIcon/>}
            variant="contained"
          >
          </LoadingButton>
        </AccordionDetails>
      </Accordion>

    </div>

  )
}

export default Upload;