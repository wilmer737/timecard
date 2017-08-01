import moment from 'moment'
import React from 'react'
import {Redirect} from 'react-router-dom'

import EntryForm from './entry-form'

class Create extends React.Component {
  constructor(props) {
    super(props)

    const today = moment().format()
    let entry = {
      start_time: today,
      end_time: today
    }

    this.state = {
      action: 'create',
      entry,
      submitted: false
    }

    this.submitForm = this.submitForm.bind(this)
  }

  submitForm(data) {
    return fetch('/new-entry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => (this.setState({submitted:true}))).catch(err => {
      throw new Error('failed to retrieve data ' + err.message)
    })
  }

  render() {
    const {entry,submitted} = this.state

    return (
      <div>
        {submitted ? <Redirect to="/"/> : <EntryForm {...entry} submitForm={this.submitForm}/>}
      </div>
    )
  }
}

export default Create
