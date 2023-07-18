//import { NavigateToResource } from "@refinedev/nextjs-router";
//export default function Home() {
//  return <NavigateToResource resource="studio" />;
//}
//Home.noLayout = true;

import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import Head from 'next/head';
import { createRoot } from "react-dom/client";
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function HomePage() {
  return (

    <div>
      <Head>
        <title>Utility Studio</title>
      </Head>
      <Typography variant="h4" align="center">
        Welcome to the Utility Studio!
      </Typography>
      <Typography variant="body1">
        A place for quick and easy access to tasks like document, video, and text summarizing.
      </Typography>

    <section>
      <h2>Features</h2>
      <ul>
        <li>
          <h3>YouTube Video, Audio, and Subtitle Downloader</h3>
          <p>
            Download videos from YouTube with the ability to extract audio tracks and subtitles. Enjoy your favorite content offline or repurpose it for other projects.
          </p>
        </li>
        <li>
          <h3>Document PDF/Docs Text Extractor</h3>
          <p>
            Extract text from doc/docx/PDF files, making it easy to copy, edit, or analyze the text content without the need for specialized software or manual retyping.
          </p>
        </li>
        <li>
          <h3>Text Summarizer</h3>
          <p>
            Summarize long blocks of text into concise and meaningful summaries. Save time and get quick insights by condensing articles, reports, or other textual content.
          </p>
        </li>
        <li>
          <h3>Link Explainer</h3>
          <p>
            Extract and summarize information from links, providing you with key details and summaries of webpages, articles, or other online resources.
          </p>
        </li>
      </ul>
    </section>

      <section>
        <h2>Call-to-Action</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Card style={{ margin: '10px', width: '45%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              YouTube
            </Typography>
            <YouTubeIcon />
            <Typography>
              Download/Summarize YouTube videos with audio/video/subtitles
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/youtube" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card style={{ margin: '10px', width: '45%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Documents
            </Typography>
            <DescriptionIcon/>
            <Typography>
              Extract and Summarize text from documents
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/documents" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card style={{ margin: '10px', width: '45%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Text 
            </Typography>
            <TextFieldsIcon/>
            <Typography>
              Summarize information from large text
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/text" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
        <Card style={{ margin: '10px', width: '45%' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Links
            </Typography>
            <LinkIcon/>
            <Typography>
              Extract and Summarize information from links
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/links" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      </section>


    <section>
      <h2>How It Works</h2>
      <p>
        The Utility Studio is built on a Refine (Next.js) project, leveraging the power of server-side rendering and React components for a smooth user experience. It integrates with Appwrite, a backend serverless platform, to handle various functionalities.
      </p>
      <p>
        When you interact with the Utility Studio, it calls Appwrite functions written in Python to perform specific tasks. For example, when you download YouTube videos, the Utility Studio triggers the appropriate Appwrite function to extract the video, audio, and subtitle files and store them securely in Appwrite's storage system.
      </p>
      <p>
        This approach ensures that your data is handled securely and efficiently, leveraging the robust features and infrastructure provided by Appwrite.
      </p>
    </section>

      <hr/>
      <footer>
      <section>
        <h4>Contact</h4>
      </section>
      <section>
        <h4>About</h4>
      </section>
      </footer>
    </div>
  );
}
