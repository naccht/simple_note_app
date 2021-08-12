import React, { useRef } from "react";
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
API.configure(awsconfig);

async function createNote() {
  await API.post('notesApi', '/allnotes', {
    body: {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value
    } 
  })
  window.location.reload()
}

const NewNote = () => {

  return (  
    <div className="container m-t-20">
      <h1 className="page-title">New Note</h1>
      <div className="newnote-page m-t-20">
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input id='title' className="input" type="text" placeholder="Note Title"/>
            </div>
          </div>
          <div class="field">
            <label class="label">Note Content</label>
            <div class="control">
              <textarea id='content' class="textarea" rows="10" placeholder="Note Content here..."></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button onClick={()=>createNote()} class="button is-link">Submit</button>
            </div>
          </div>
      </div>
    </div>
  )
}
export default NewNote;