import React from "react";
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
API.configure(awsconfig);

async function editNote() {
  console.log('rere')
  let url = window.location.pathname.split('/')
  let id = url.pop()
  console.warn(id)
  await API.put('notesApi', '/allnotes/'+ id, {
    body: {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value
    } 
  })
  window.location.reload()}

const EditNote = () => {
  let elements = window.location.search.substr(1)
  try{var title = elements.split('&')[0].split('=')[1].replace(/%20/g, " ")}
  catch(e){}
  try{var content = elements.split('&')[1].split('=')[1].replace(/%20/g, " ")}
  catch(e){}
  return (
    <div className="container m-t-20">
      <h1 className="page-title">Edit Note</h1>
      <div className="newnote-page m-t-20">
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input id="title" className="input" type="text" placeholder="Note Title" value={title}/>
            </div>
          </div>
          <div class="field">
            <label class="label">Note Content</label>
            <div class="control">
              <textarea
                class="textarea"
                rows="10"
                placeholder="Note Content here..."
                id="content"
              >{content}</textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button onClick={()=>editNote()} class="button is-link">Submit</button>
            </div>
          </div>
      </div>
    </div>
  );
}
export default EditNote;