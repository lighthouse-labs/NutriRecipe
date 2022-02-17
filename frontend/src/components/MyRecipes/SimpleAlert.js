import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Link as Link1} from "react-router-dom";

const SimpleAlert = (props) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert severity="info">
      <AlertTitle>{props.title}</AlertTitle>
        {props.content} <strong> <Link1  to="/newrecipe" underline="none">{props.emph}</Link1></strong>
    </Alert>
  </Stack>
  )
}
export default SimpleAlert;