import { Functions } from "appwrite";
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import YouTube from 'react-youtube';
import * as appwriteConfig from 'src/utility/appwriteClient';
import {marked} from 'marked';

export default function YouTubeUtility() {
  const [url, setUrl] = useState('');
  const [subtitles, setSubtitles] = useState('');
  const [summary, setSummary] = useState('');

  async function downloadAudio() {
    const function_id = appwriteConfig.AUDIO_FUNCTION_ID;
    const video_id = getVideoIdFromURL(url);
    const parsed_url = "https://www.youtube.com/watch?v=" + video_id;
    setUrl(parsed_url);

    const promise = appwriteConfig.functions.createExecution(function_id, parsed_url);
    promise.then(function (response: any) {
      const jsonString = response.response;
      const data = JSON.parse(jsonString);
      const url = data.url;
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename;
      link.click();
    }, function (error: any) {
      console.log(error);
    });
  }

  async function downloadVideo() {
    const function_id = appwriteConfig.VIDEO_FUNCTION_ID;
    const video_id = getVideoIdFromURL(url);
    const parsed_url = "https://www.youtube.com/watch?v=" + video_id;
    setUrl(parsed_url);

    const promise = appwriteConfig.functions.createExecution(function_id, parsed_url);
    promise.then(function (response: any) {
      const jsonString = response.response;
      const data = JSON.parse(jsonString);
      const url = data.url;
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename;
      link.click();
    }, function (error: any) {
      console.log(error);
    });
  }

  async function getSubtitles() {
    const function_id = appwriteConfig.SUBTITLE_FUNCTION_ID;
    const video_id = getVideoIdFromURL(url);
    const parsed_url = "https://www.youtube.com/watch?v=" + video_id;
    setUrl(parsed_url);

    const promise = appwriteConfig.functions.createExecution(function_id, parsed_url);
    promise.then(function (response: any) {
      const jsonString = response.response;
      const data = JSON.parse(jsonString);
      if (data.subtitles) {
        setSubtitles(data.subtitles);
      } else {
        setSubtitles("");
      }
    }, function (error: any) {
      console.log(error);
    });
  }

  async function summarizeSubtitles() {
      const subtitles = document.getElementById('subtitles') as HTMLInputElement;
      if (subtitles.value !== "") {
          const text = subtitles.value;
          const data = await fetch('/api/palm', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text: "Summarize in bullet points, " + text,
              }),
              safetySettings: [
                {
                  category: 'HARM_CATEGORY_DEROGATORY',
                  threshold: 'BLOCK_LOW_AND_ABOVE',
                },
                {
                  category: 'HARM_CATEGORY_TOXICITY',
                  threshold: 'BLOCK_LOW_AND_ABOVE',
                },
                {
                  category: 'HARM_CATEGORY_VIOLENCE',
                  threshold: 'BLOCK_LOW_AND_ABOVE',
                },
                {
                  category: 'HARM_CATEGORY_SEXUAL',
                  threshold: 'BLOCK_LOW_AND_ABOVE',
                },
                {
                  category: 'HARM_CATEGORY_MEDICAL',
                  threshold: 'BLOCK_LOW_AND_ABOVE',
                },
                {
                  category: 'HARM_CATEGORY_DANGEROUS',
                  threshold: 'BLOCK_LOW_AND_ABOVE',
                },
              ],
          });
          const resp = await data.json();
          console.log(resp.data)
          setSummary(resp.data);
      }
  }

  const renderMarkdown = (text: string) => {
    const html = marked(text);
    console.log(html);
    return { __html: html };
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <YouTube videoId={getVideoIdFromURL(url)} opts={{ width: '100%', height: '400' }} />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" sx={{ mt: 2 , mr:1 }} onClick={downloadAudio}>Download Audio</Button>
        <Button variant="contained" color="primary" sx={{ mt: 2 , mr:1 }} onClick={downloadVideo}>Download Video</Button>
        <Button variant="contained" color="primary" sx={{ mt: 2, mr:1 }} onClick={getSubtitles}>Download Subtitles</Button>
        <Button variant="contained" color="primary"sx={{ mt: 2, mr:1 }} onClick={summarizeSubtitles}>Summarize Subtitles *</Button>
      </Grid>

{subtitles &&
      <Grid item xs={12}>
        <TextField
          label="Subtitles"
          id="subtitles"
          multiline
          rows={4}
          value={subtitles}
          disabled
          fullWidth
        />
      </Grid>
      }
      {summary && (
          <Grid item>
            <div dangerouslySetInnerHTML={renderMarkdown(summary)} />
          </Grid>
      )}
    </Grid>
  );
}

function getVideoIdFromURL(url: string): string | undefined {
  if (!url || !isValidURL(url)) {
    return undefined;
  }
  const urlObject = new URL(url);
  if (urlObject.hostname === 'youtu.be') {
    const id = urlObject.pathname.slice(1);
    return id;
  } else if (urlObject.hostname === 'www.youtube.com') {
    const videoId = urlObject.searchParams.get('v');
    return videoId ?? undefined;
  } else {
    return undefined;
  }
}

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
