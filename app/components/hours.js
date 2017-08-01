import React from 'react'
import 'whatwg-fetch'
import moment from 'moment'
import {Container, Message} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

import Entry from './entry'
import DeleteMessage from './delete-message'

class Hours extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Hours'
    this.state = {
      entries: [],
      messageInfo: {hidden: true}
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  componentDidMount() {
    this.getEntries().then(res => {
      return res.json()
    }).then(data => {
      this.setState({entries: [...data]})
    }).catch(err => {
      return console.log(err.message)
    })
  }

  getEntries() {
    const today = moment()
    const firstDay = today.startOf('month').format('YYYY-MM-DD')
    const lastDay = today.endOf('month').endOf('day').format('YYYY-MM-DD H:m:s')

    return fetch('/get-hours', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({firstDay, lastDay}),
    })
  }

  handleDeleteClick(id) {
    this.deleteRecord(id).then(data => {
      let state = {messageInfo: {visible: true}}
      if (data.status === 200) {
        state.messageInfo.positive = true
        state.negative = false
        state.messageInfo.header = 'We did it! 😎'
        state.messageInfo.content = 'Successfully deleted stuff'
      } else {
        state.messageInfo.positive = false
        state.messageInfo.negative = true
        state.messageInfo.header = 'Oh no! 😰'
        state.messageInfo.content = 'Something went wrong'
      }
      let entries = this.state.entries.filter(entry => entry.id != id)
      state.entries = [...entries]

      return this.setState(state)
    })
    .catch(err => console.log(err.message))
  }

  handleDismiss(e) {
    return this.setState({messageInfo: {visible: false, hidden: true}})
  }

  deleteRecord(id) {
    return fetch('/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({id})
    })
  }

  renderItems() {
    return this.state.entries.map(({id, ...restProps}) => {
      return <Entry key={id} {...restProps} id={id} handleDeleteClick={this.handleDeleteClick} />
    })
  }

  render() {
    const {messageInfo} = this.state
    return (
      <Container textAlign='center'>
        <DeleteMessage {...messageInfo} handleDismiss={this.handleDismiss}/>
        {this.renderItems()}
      </Container>
    )
  }
}

export default Hours
