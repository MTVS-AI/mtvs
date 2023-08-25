from flask import Blueprint, jsonify
import time
from flask import request
from werkzeug.utils import secure_filename
from utils.chatbot import chatbot
from utils.imgPro import ImageProcess as IP
from utils.imgUpload import uploader_file as IU

myhome_bp = Blueprint('myhome', __name__, url_prefix='/myhome')

@myhome_bp.route('/chatbot', methods=['POST'])
def chatbot_route():
    response = chatbot()    
    return response



@myhome_bp.route('/map', methods=['POST'])
def map():
    IU(request)    
    aaa = IP('')
    aaa.run_all(aaa.imgs, aaa.json_file_path)
    return 'file uploaded successfully'