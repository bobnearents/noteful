import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import Context from '../Context';
import config from '../config';

export default class AddFolder extends Component {
  static contextType = Context;

  handleSubmit = e => {
    e.preventDefault();
    let name = e.currentTarget['folder-name-input'].value
    console.log(name)
    const folder = {name: name};
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        name = ''
        this.context.addFolder(data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={(e) => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
