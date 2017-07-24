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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({submitted: true})
  }

  render() {
    const {entry,submitted} = this.state

    return (
      <div>
        Create
        {submitted ? <Redirect to="/"/> : <EntryForm {...entry} handleSubmit={this.handleSubmit} />}
      </div>
    )
  }
}

export default Create
