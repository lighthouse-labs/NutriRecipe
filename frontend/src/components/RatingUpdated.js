import React from 'react'
import Alert from '@mui/material/Alert';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './ratingUpdated.css'
import {FaWindowClose} from 'react-icons/fa'



const RatingUpdated = (props) => {
  console.log(props);
  return (
    <>
      {props.error && <Alert severity="error">Error Saving Rating!</Alert>}
      {!props.error && <Alert severity="success" style={{maxWidth: 250}}>Rating {props.message} successfully!!
      <FaWindowClose onClick={() => props.setRatingUpdated(0)} />
      </Alert>}
    </>
  );
}


export default RatingUpdated