import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import {TextareaAutosize} from '@mui/base';
import {marked} from 'marked';

export default function LinkExtracterUtility() {

  const [text, setText] = useState('');
  const [info, setInfo] = useState('');

  async function extractLinkInfo() {
    const data = await fetch('/api/palm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: "Extract the information from these links, " + text,
      }),
    });

    const resp = await data.json();
    setInfo(resp.data);
  }

  const renderMarkdown = (text: string) => {
    const html = marked(text);
    console.log(html);
    return { __html: html };
  };

  return (
    <div>
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <TextareaAutosize
          value={text}
          placeholder="Enter Link"
          onChange={(e) => setText(e.target.value)}
          style={{ width: '400px', minHeight: '200px', padding: '10px' }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={extractLinkInfo}>
          Extract Info 
        </Button>
      </Grid>
      {info && (
        <Grid item>
          <div dangerouslySetInnerHTML={renderMarkdown(info)} />
        </Grid>
      )}
    </Grid>
    </div>
  );
}

