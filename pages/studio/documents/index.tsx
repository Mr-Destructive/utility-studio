import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import YouTube from 'react-youtube';
import ytdl from 'ytdl-core';

export default function YouTubeUtility() {

  const [url, setUrl] = useState('');

  async function downloadAudio() {
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    console.log(audioFormat);
    if (!audioFormat) {
      console.error('No audio format found'); 
      return;
    }

    const audioStream = ytdl(url, {
      filter: format => format.itag === audioFormat.itag
    });

  }

  return (
    <div>
  <input
        accept="*"
        style={{ display: 'none' }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={downloadAudio}
      />

      <Button onClick={downloadAudio}>
        Extract Text
      </Button>
      <Button onClick={downloadAudio}>
        Summarize Text
      </Button>
    </div>
  );
}

// Helper function to get video ID from various URL formats
function getVideoIdFromURL(url) {
  // Parse URL and return video ID 
}
