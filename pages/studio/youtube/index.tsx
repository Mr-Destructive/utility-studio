import { Functions } from "appwrite";
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import YouTube from 'react-youtube';
import {appwriteClient} from 'src/utility/appwriteClient'

export default function YouTubeUtility() {
  const [url, setUrl] = useState('');

  async function downloadAudio() {
    const function_id = "64b01463c70b90f0596a"
    console.log(appwriteClient);
    const functions = new Functions(appwriteClient);
    const promise = functions.createExecution(function_id, url);
    promise.then(function (response) {
        console.log(response);
        const jsonString = response.response;
        const data = JSON.parse(jsonString);
        const url = data.url;
        const link = document.createElement('a');
        link.href = url;
        link.download = data.filename;
        link.click();
    }, function (error) {
        console.log(error);
    });
  }

  return (
    <div>
      <TextField
        label="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <YouTube videoId={getVideoIdFromURL(url)} opts={{ width: '90%', height: '80%' }} />

      <Button onClick={downloadAudio}>Download Audio</Button>
      <Button onClick={downloadAudio}>Download Video</Button>
      <Button onClick={downloadAudio}>Download Subtitles</Button>
      <Button onClick={downloadAudio}>Summarize Subtitles *</Button>
    </div>
  );
}

// Helper function to get video ID from various URL formats
function getVideoIdFromURL(url) {
  const id =url.split('/watch?v=')[1];
  console.log(id);
  return id;
}
