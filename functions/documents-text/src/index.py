import os

from appwrite.client import Client
from appwrite.services.storage import Storage


def document_to_text(file):
    try:
        print(file)
        file_type = os.path.splitext(file)[1]
        if file_type == '.docx' or file_type == '.doc':
            import docx
            doc = docx.Document(file)
            text = ''
            for para in doc.paragraphs:
                text += para.text
            return text
        elif file_type == '.pdf':
            import PyPDF2
            pdf = PyPDF2.PdfReader(file)
            text = ''
            for page in range(len(pdf.pages)):
                text += pdf.pages[page].extract_text()
            return text
    except Exception as e:
        print(e)
        return ""

def main(req, res):
  client = Client()
  storage = Storage(client)

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
  data = storage.get_file_download(bucket_id, file_id)
  file = storage.get_file(bucket_id, file_id)
  with open(file["name"], 'wb') as f:
     f.write(data)
  text = document_to_text(file["name"])
  return res.json({
    "text": text
  })
