import React from 'react';
import Button from '@mui/material/Button';

export default function Confirm (props) {
  
  return (
    <main >
      <h1 className>{props.message}</h1>
      <section >
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}