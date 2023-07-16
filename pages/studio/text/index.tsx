import React, { useState, useEffect } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Button, Grid, TextField } from '@mui/material';

export default function TextSummaryUtility() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  async function summarizeText() {
    const data = await fetch('/api/palm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const resp = await data.json();
    console.log(resp);
    setSummary(resp.data);
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <TextareaAutosize
          value={text}
          placeholder="Enter text"
          onChange={(e) => setText(e.target.value)}
          style={{ width: '400px', minHeight: '200px', padding: '10px' }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={summarizeText}>
          Summarize
        </Button>
      </Grid>
      {summary && (
        <Grid item>
          <TextField
            value={summary}
            variant="outlined"
            label="Summary"
            fullWidth
            multiline
            rows={4}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}
