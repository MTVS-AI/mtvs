from flask import Blueprint, request, jsonify
from sentence_transformers import SentenceTransformer
import chromadb
import pandas as pd

myhome_bp = Blueprint('myhome', __name__, url_prefix='/myhome')

# 모델 및 데이터베이스 초기화
model = SentenceTransformer('sentence-transformers/xlm-r-100langs-bert-base-nli-stsb-mean-tokens')
model = model.to('cpu')

client = chromadb.Client()
collections = client.create_collection('chatbot')

df = pd.read_csv('ChatbotData.csv')
df1 = pd.read_csv('embeding.csv', header=None)
embeddings = []
metadata = []
ids = []

for temp in range(len(df1)):
    ids.append(str(temp + 1))
    embeddings.append(df1.iloc[temp].tolist())
    metadata.append({'A': df.iloc[temp]['A']})

collections.add(embeddings=embeddings, metadatas=metadata, ids=ids)


@myhome_bp.route('/chatbot', methods=['POST'])
def chatbot():
    chat_text = model.encode(request.json.get('chat'))
    query_result = collections.query(query_embeddings=[chat_text.tolist()], n_results=3)
    return query_result['metadatas'][0][0]['A']