import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Button, Grid, TextField } from '@mui/material';
import {marked} from 'marked';

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
        text: 'Summarize in bullet points, ' + text,
      }),
    });

    const resp = await data.json();
    console.log(resp);
    setSummary(resp.data);
  }

  const renderMarkdown = (text: string) => {
    const html = marked(text);
    console.log(html);
    return { __html: html };
  };

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
            <div dangerouslySetInnerHTML={renderMarkdown(summary)} />
          </Grid>
      )}
    </Grid>
  );
}
