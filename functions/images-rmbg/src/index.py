from pathlib import Path

import cv2
import numpy as np
from appwrite.client import Client
from appwrite.services.storage import Storage
from appwrite.input_file import InputFile

def remove_bg(file_path):
    image = cv2.imread(file_path)    
    mask = np.zeros(image.shape[:2], np.uint8)  
    mask = np.zeros(image.shape[:2], np.uint8)  
    bgd_model = np.zeros((1,65), np.float64)
    fgd_model = np.zeros((1,65), np.float64)
    rect = (10, 10, image.shape[1]-10, image.shape[0]-10)
    cv2.grabCut(image, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
    background_mask = np.where((mask==cv2.GC_BGD) | (mask==cv2.GC_PR_BGD), 1, 0).astype('uint8') 
    transparent_bg = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    transparent_bg[:, :, 3] = (1 - background_mask) * 255
    foreground = cv2.bitwise_and(image,image, mask=255-background_mask)
    transparent_bg[:, :, :3] = foreground
    cv2.imwrite('new_image.png', transparent_bg)
    return Path('new_image.png')

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

  bucket_id = req.variables.get('APPWRITE_STORAGE_BUCKET_ID', None)
  file_id = req.payload
  storage = Storage(client)
  file = storage.get_file(bucket_id, file_id)
  new_file = remove_bg(file)
  uploaded_file = storage.update_file(bucket_id, file_id, InputFile.from_path(new_file))
  
  return res.json({
    "file": uploaded_file["$id"]
  })
