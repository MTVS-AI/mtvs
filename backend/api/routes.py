from flask import Blueprint, jsonify
from utils.chatbot import chatbot  # utils.py에서 chatbot 함수를 import

myhome_bp = Blueprint('myhome', __name__, url_prefix='/myhome')

@myhome_bp.route('/chatbot', methods=['POST'])
def chatbot_route():
    response = chatbot()    
    return response