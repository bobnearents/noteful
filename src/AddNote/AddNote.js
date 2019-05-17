import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import Context from '../Context';
import config from '../config';

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  };
  
  static contextType = Context;

  //note-name-input
  // note-content - input
// note - folder - select'
  handleSubmit = e => {
    e.preventDefault();
    let name = (e.currentTarget['note-name-input'])
    let content = (e.currentTarget['note-content-input'])
    let folder_id = (e.currentTarget['note-folder-select'])
    const note = {
      name: name.value,
      folder_id: folder_id.value,
      content: content.value
    };
    console.log(note)
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {
          throw new Error(error)
        })
      }
      return res.json()
    })
    .then(data => {
      name.value = ''
      folder_id.value = ''
      content.value = ''
      this.context.addNote(data)
    })
    .catch(error => {
      console.error(error)
    })
}

  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit' >
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
