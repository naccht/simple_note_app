import json
from flask import Flask, jsonify, request
import awsgi
from flask_cors import CORS
import boto3
import uuid

app = Flask(__name__)
CORS(app)
ROUTE = "/allnotes"
TABLE = 'Notes-dev'
db = boto3.client('dynamodb')


def handler(event, context):
  return(awsgi.response(app,event,context))

# Function to return all elements in DynamoDB, pagination was implemented as
# scan doesn't return more than 1mb of data at once
@app.route(ROUTE, methods = ['GET'])
def list_all_notes():
  data = db.scan(
      TableName = TABLE
      )
  return(jsonify(data))


@app.route(ROUTE+'/<id>', methods = ['GET'])
def get_note(id):
  note = db.get_item(
    TableName = TABLE,
    Key = {'id': {'S': id}})
  return(jsonify(note))


@app.route(ROUTE, methods = ['POST'])
def add_note():
  elements = request.get_json()
  db.put_item(TableName = TABLE,
  Item={
    'id':{
      'S': str(uuid.uuid4())
    }, 'title':{
      'S': elements.get('title')
    }, 'content':{
      'S': elements.get('content')}})
  return(jsonify('successful'))


@app.route(ROUTE+'/<id>', methods=['PUT'])
def modify_note(id):
  db.update_item(
  TableName=TABLE,
  Key={'id': {'S': id}},
  UpdateExpression='set info.title=:title, info.content=:content',
  ExpressionAttributeValues={
      ':title': {'S': request.json['title']},
      ':content': {'S': request.json['content']}
  }
  )
  return jsonify('successful')


@app.route(ROUTE+'/<id>', methods=['DELETE'])
def delete_note(id):
  db.delete_item(
    TableName=TABLE,
    Key={'id': {'S': id}}
    )
  return jsonify(message="deleted")

