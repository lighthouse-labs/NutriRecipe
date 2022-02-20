import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const SimpleAlert = (props) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert severity="info">
      <AlertTitle>{props.title}</AlertTitle>
        {props.content} <strong> <Link  href="/newrecipe">{props.emph}</Link></strong>
    </Alert>
  </Stack>
  )
}
export default SimpleAlert;