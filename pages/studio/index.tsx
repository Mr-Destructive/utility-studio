import {
  Typography,
  Card, 
  CardContent,
  CardActions,
  Button 
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function HomePage() {

  return (
    <div>
      <Typography variant="h4" align="center">
        Welcome to the Utility Studio!
      </Typography>

    <div style={{display: 'flex', flexWrap: 'wrap'}}>

        <Card style={{margin: '10px', width: '45%'}}>
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
            <Button href="/studio/youtube" size="small">Learn More</Button>
          </CardActions>
        </Card>

        <Card style={{margin: '10px', width: '45%'}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Documents
            </Typography>
            <DescriptionIcon />
            <Typography>
              Extract and Summarize text from documents
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/documents" size="small">Learn More</Button>
          </CardActions>
        </Card>

        <Card style={{margin: '10px', width: '45%'}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Text
            </Typography>
            <TextFieldsIcon />
            <Typography>
              Summarize information from large text
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/text" size="small">Learn More</Button>
          </CardActions>
        </Card>

        <Card style={{margin: '10px', width: '45%'}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Links
            </Typography>
            <LinkIcon />
            <Typography>
              Extract and Summarize information from links
            </Typography>
          </CardContent>
          <CardActions>
            <Button href="/studio/links" size="small">Learn More</Button>
          </CardActions>
        </Card>


      </div>

    </div>
  );
}
