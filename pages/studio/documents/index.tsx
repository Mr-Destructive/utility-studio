import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import {appwriteClient, functions, storage} from 'src/utility/appwriteClient'
import {ID} from "appwrite";

export default function DocumentUtility() {

  const [url, setUrl] = useState('');
  const [text, setText] = useState('');

  async function downloadText() {
    const bucket_id = "64b24dda9932e3acc1be"
    const function_id = "64b24b4834ee2c415dd8"
    const file_id = ID.unique();
    const promise = storage.createFile(bucket_id, file_id, document.getElementById('uploader').files[0]);
    promise.then(function (response) {
        console.log(response);
        let fileid = response["$id"];
        const text = functions.createExecution(function_id, fileid);
        text.then(function (response) {
            console.log(response);
            const jsonString = response.response;
            const text = JSON.parse(jsonString);
            setText(text.text);
        }, function (error) {
            console.log(error);
        });
    }, function (error) {
        console.log(error);
    });
  }

  return (
    <div>
      <input type="file" id="uploader" />
      <Button onClick={downloadText}>
        Remove Background
      </Button>
      <TextField
        label="Text"
        value={text}
        disabled
      />
    </div>
  );
}

