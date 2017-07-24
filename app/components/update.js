import React from 'react'
import 'whatwg-fetch'

import NewTimeForm from './log-new-time'
import EntryForm from './entry-form'

class Update extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Update'

    this.state = {
      action: 'update',
      entry: {}
    }
  }

  componentWillMount() {
    this.getRecord().then(res => res.json()
    ).then(entry => this.setState({entry})
    ).catch(err => {
      console.log(err.message)
    })
  }

  getRecord() {
    const {id} = this.props.match.params
    return fetch('/get-entry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({id}),
    })
  }

  render() {
    return (
     
      <div>
        Update Form id: {`${this.props.match.params.id}`}
        <EntryForm entry={this.state.entry} />
      </div>
    )
  }
}

export default Update
