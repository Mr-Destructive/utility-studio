import React, { useState, useRef } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import { ID } from "appwrite";
import MuiAlert from '@mui/material/Alert';
import * as appwriteConfig from 'src/utility/appwriteClient';

export default function DocumentUtility() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    if (fileRef.current !== null) {
      fileRef.current.value = '';
    }
  };

  async function downloadText() {
    const bucket_id = appwriteConfig.DOCUMENTS_BUCKET_ID;
    const function_id = appwriteConfig.DOCUMENTS_FUNCTION_ID;
    const file_id = ID.unique();
    const doc = (document.getElementById('uploader') as HTMLInputElement)?.files?.[0];

    if (!doc) {
      setOpenSnackbar(true);
      return;
    }

    const promise = appwriteConfig.storage.createFile(bucket_id, file_id, doc);
    promise.then(function (response: any) {
      console.log(response);
      let fileid = response["$id"];
      const text = appwriteConfig.functions.createExecution(function_id, fileid);
      text.then(function (response: any) {
        console.log(response);
        const jsonString = response.response;
        const text = JSON.parse(jsonString);
        setText(text.text);
      }, function (error: any) {
        console.log(error);
      });
    }, function (error: any) {
      console.log(error);
    });
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <input type="file" id="uploader" ref={fileRef} />

      <Button onClick={handleCancel} variant="outlined" sx={{ mt: 2, mr: 1 }}>
        Cancel
      </Button>

      <Button onClick={downloadText} variant="contained" color="primary" sx={{ mt: 2 }}>
        Extract Text
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} sx={{ mt: 2 }}>
        <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          No file selected!
        </MuiAlert>
      </Snackbar>

      {text &&
        <TextField
          label="Text"
          value={text}
          multiline
          rows={4}
          sx={{ mt: 2 }}
        />
      }
    </div>
  );
}
