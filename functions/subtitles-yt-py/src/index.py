from appwrite.client import Client
from youtube_transcript_api import YouTubeTranscriptApi

def subtitle_extract(url):
  url = url.split('/watch?v=')[1]
  subtitle_text = ""
  subtitles = YouTubeTranscriptApi.get_transcript(url)
  try:
    for subtitle in subtitles:
        subtitle_text += " " + subtitle['text']
    return subtitle_text
  except Exception as e:
    print(e)


def main(req, res):
  client = Client()

  # You can remove services you don't use

  if not req.variables.get('APPWRITE_FUNCTION_ENDPOINT') or not req.variables.get('APPWRITE_FUNCTION_API_KEY'):
    print('Environment variables are not set. Function cannot use Appwrite SDK.')
  else:
    (
    client
      .set_endpoint(req.variables.get('APPWRITE_FUNCTION_ENDPOINT', None))
      .set_project(req.variables.get('APPWRITE_FUNCTION_PROJECT_ID', None))
      .set_key(req.variables.get('APPWRITE_FUNCTION_API_KEY', None))
      .set_self_signed(True)
    )
  subtitles = subtitle_extract(req.payload)
  
  return res.json({
    "subtitles": subtitles
  })
