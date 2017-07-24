import moment from 'moment'
import React from 'react'

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
      entry
    }
  }

  render() {
    return (
      <div>
        Create
        <EntryForm entry={this.state.entry} />
      </div>
    )
  }
}

export default Create
