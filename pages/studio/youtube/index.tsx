import { Functions } from "appwrite";
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import YouTube from 'react-youtube';
import * as appwriteConfig from 'src/utility/appwriteClient';

export default function YouTubeUtility() {
  const [url, setUrl] = useState('');
  const [subtitles, setSubtitles] = useState('');

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
        <Button variant="contained" color="primary"sx={{ mt: 2, mr:1 }}>Summarize Subtitles *</Button>
      </Grid>

{subtitles &&
      <Grid item xs={12}>
        <TextField
          label="Subtitles"
          multiline
          rows={4}
          value={subtitles}
          disabled
          fullWidth
        />
      </Grid>
      }
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
