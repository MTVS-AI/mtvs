from flask import Blueprint, jsonify, send_file
import time
import pandas as pd
from flask import request
from werkzeug.utils import secure_filename
from utils.chatbot import chatbot
from utils.imgPro import ImageProcess as IP
from utils.imgUpload import uploader_file as IU
from utils.folium_map import MapManager as MM

myhome_bp = Blueprint('myhome', __name__, url_prefix='/myhome')

@myhome_bp.route('/chatbot', methods=['POST'])
def chatbot_route():
    try:
        response = chatbot()
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@myhome_bp.route('/map', methods=['POST'])
def map():
    try:
        IU(request)
        aaa = IP('','','')
        df_report = aaa.run_all(aaa.imgs, aaa.json_file_path)

        map_manager = MM(df_report)
        map_manager.create_folder(df_report)   
        print("sending")
        with open('./folium/Map.html', 'r') as f:
            map_html = f.read()
        return jsonify({"mapHtml": map_html})

        # return map_html
        # return send_file('./folium/Map.html')
    
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500