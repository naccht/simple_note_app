import React from "react";
import { Link } from "react-router-dom";
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { useEffect, useState } from "react";

Amplify.configure(awsconfig);
API.configure(awsconfig);

const ParentThatFetches = () => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      const resp = await API.get('notesApi', '/allnotes');
      updateData(resp);
    }
    getData();
  }, []);
  console.warn(data)
  return (
    <div className="container m-t-20">
                 <h1 className="page-title">All Notes</h1><div className="allnotes-page">
                   <div className="columns is-multiline">
                     {data.Items.map(note => (
                          <div className="column is-one-third" key={note.id.S}>
                            <div className="card">
                              <header className="card-header">
                                <p className="card-header-title" id="title">{note.title.S}</p>
                              </header>
                              <div className="card-content">
                                <div className="content" id="content">
                                  {note.content.S}
                                  <br />
                                </div>  
                              </div>
                              <footer className="card-footer">
                              <Link to={`note/${note.id.S}`} className="card-footer-item">
                                  Edit
                                </Link>
                                <a href="#" className="card-footer-item">
                                  Delete
                                </a>
                              </footer>
                            </div>
                        </div>
                      ))
                    }
                </div>
              </div>
            </div>
  )
}
export default ParentThatFetches;