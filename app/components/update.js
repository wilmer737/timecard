import React from 'react'
import {Redirect} from 'react-router-dom'
import {Loader} from 'semantic-ui-react'
import 'whatwg-fetch'

import EntryForm from './entry-form'

class Update extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Update'

    this.state = {
      action: 'update',
      entry: {},
      submitted: false,
      isLoading: true,
    }
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.getRecord()
      .then(res => res.json())
      .then(entry => this.setState({entry, isLoading: false}))
      .catch(err => {
        console.log(err.message)
      })
  }

  submitForm(entry) {
    let data = {id: this.state.entry.id, newValues: entry}
    return fetch('/update-entry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => this.setState({submitted: true}) )
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
        {
          this.state.submitted ? <Redirect to='/' /> :
            this.state.isLoading ? <Loader active inline/> : <EntryForm {...this.state.entry} submitForm={this.submitForm}/>
          }
      </div>
    )
  }
}

export default Update
