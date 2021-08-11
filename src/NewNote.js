import React from "react";
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
API.configure(awsconfig);

function submit() { 
  API.post('notesApi', '/allnotes', { 
  body: { 
    title: this.title.current, 
    content: this.content.current
  } 
})}

const NewNote = () => {
  constructor(props); {
    this.title = React.createRef();
  this.content = React.createRef();
}
  return (
    <div className="container m-t-20">
      <h1 className="page-title">New Note</h1>
      <div className="newnote-page m-t-20">
        <form>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Note Title" ref={this.title}/>
            </div>
          </div>
          <div class="field">
            <label class="label">Note Content</label>
            <div class="control">
              <textarea class="textarea" rows="10" placeholder="Note Content here..." ref={this.content}></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" onClick={submit}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default NewNote;