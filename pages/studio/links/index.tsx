import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import {TextareaAutosize} from '@mui/base';

export default function LinkExtracterUtility() {

  const [url, setUrl] = useState('');

  async function extractLinkInfo() {

  }

  return (
    <div>
      <TextareaAutosize
        placeholder="Enter the links here"
      />
      <Grid item xs={12}>
      <Button variant="contained" color="primary"sx={{ mt: 2, mr:1 }} onClick={extractLinkInfo}>
        Extract Link Info
      </Button>
      </Grid>
    </div>
  );
}

