import { Functions } from "appwrite";
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import YouTube from 'react-youtube';
import {appwriteClient} from 'src/utility/appwriteClient'

export default function YouTubeUtility() {
  const [url, setUrl] = useState('');
  const [subtitles, setSubtitles] = useState('');

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
  async function downloadVideo() {
    const function_id = "64b1319a68ab613e05e0"
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
  async function getSubtitles() {
    const function_id = "64b139bdc28f44d2da36"
    console.log(appwriteClient);
    const functions = new Functions(appwriteClient);
    const promise = functions.createExecution(function_id, url);
    promise.then(function (response) {
        console.log(response);
        const jsonString = response.response;
        const data = JSON.parse(jsonString);
        setSubtitles(data.subtitles);
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
      <Button onClick={downloadVideo}>Download Video</Button>
      <Button onClick={getSubtitles}>Download Subtitles</Button>
      <Button onClick={downloadAudio}>Summarize Subtitles *</Button>
      <TextField
        label="Subtitles"
        multiline
        rows={4}
        value={subtitles}
        disabled
      />
    </div>

  );
}

// Helper function to get video ID from various URL formats
function getVideoIdFromURL(url: string) {
  const id =url.split('/watch?v=')[1];
  console.log(id);
  return id;
}
