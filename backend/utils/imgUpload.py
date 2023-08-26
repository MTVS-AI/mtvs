from flask import request
from werkzeug.utils import secure_filename
import os
import time

def file_validation(filename):
    ALLOWED_EXTENSIONS = set(['jpg', 'JPG', 'png', 'PNG', 'mp4', 'json'])
    file_extension = filename.rsplit('.', 1)[1]
    return '.' in filename and file_extension in ALLOWED_EXTENSIONS, filename

def uploader_file(request):
    if request.method == 'POST':
        abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__),'..', 'capture_data'))
        print("Absolute path is:", abs_path)
        if not os.path.exists(abs_path):
            os.mkdir(abs_path)

        files = request.files.getlist('files[]')
        print(files)
        for fil in files:
            filename = secure_filename(fil.filename)
            print(fil)
            print(filename)
            time.sleep(0.01)
            result, filename = file_validation(filename)
            if result:
                try:
                    fil.save(os.path.join(abs_path, filename))
                except Exception as e:
                    print(f"An error occurred while saving the file: {e}")
                    return str(e)
                
        return 'file uploaded successfully'