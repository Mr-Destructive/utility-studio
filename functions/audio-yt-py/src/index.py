from logging import log
from pathlib import Path
import os
import uuid

from appwrite.client import Client
from appwrite.services.storage import Storage
from appwrite.input_file import InputFile
import pytube


def audio_url(url):
  folder = "audios/"
  yt = pytube.YouTube(url)
  try:
    stream = yt.streams.filter(only_audio=True).first()
    audio = stream.download(output_path=folder)
    return audio, yt.title
  except Exception as e:
    log.error(e)
    return yt.title

def main(req, res):
  client = Client()

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
  
  storage = Storage(client)
  bucket_id = req.variables.get('APPWRITE_STORAGE_BUCKET_ID', None)

  filename, title = audio_url(req.payload)
  unique_file_id = str(uuid.uuid4().hex)[:36]
  result = storage.create_file("64b11fca6e6c8dfdaf67", unique_file_id, InputFile.from_path(filename))
  url = f"{req.variables.get('APPWRITE_FUNCTION_ENDPOINT')}/storage/buckets/{bucket_id}/files/{unique_file_id}/view?project={req.variables.get('APPWRITE_FUNCTION_PROJECT_ID')}"
  return res.json({
    "audio": result["$id"],
    "filename": title,
    "url": url
  })

