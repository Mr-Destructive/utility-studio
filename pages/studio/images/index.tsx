import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import YouTube from 'react-youtube';
import {appwriteClient, functions, storage} from 'src/utility/appwriteClient'
import {ID} from "appwrite";

export default function YouTubeUtility() {

  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');

  async function downloadAudio() {
    const bucket_id = "64b16c50a102080123de"
    const function_id = "64b1722c8a0b918e0edc"
    const file_id = ID.unique();
    const promise = storage.createFile(bucket_id, file_id, document.getElementById('uploader').files[0]);
    promise.then(function (response) {
        console.log(response);
        let fileid = response["$id"];
        const new_file = functions.createExecution(function_id, fileid);
        new_file.then(function (response) {
            console.log(response);
            const result = storage.getFileDownload(bucket_id, fileid);
            setLink(result);
        }, function (error) {
            console.log(error);
        });
    }, function (error) {
        console.log(error);
    });
  }

  return (
    <div>
      <TextField 
        label="Image"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input type="file" id="uploader" />

      <Button onClick={downloadAudio}>
        Remove Background
      </Button>
      <TextField
        label="Image Link"
        value={link}
        disabled
      />
    </div>
  );
}

// Helper function to get video ID from various URL formats
function getVideoIdFromURL(url: string) {
  // Parse URL and return video ID 
}
