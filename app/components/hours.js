import React from 'react'
import 'whatwg-fetch'
import moment from 'moment'

import Entry from './entry'

class Hours extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Hours'
    this.state = {
      entries: []
    }
  }

  componentWillMount() {
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
    const lastDay = today.endOf('month').format('YYYY-MM-DD')

    return fetch('/get-hours', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({firstDay, lastDay}),
    })
  }

  renderItems() {
    return this.state.entries.map(({id, ...restProps}) => {
      return <Entry key={id} {...restProps} id={id}/>
    })
  }

  render() {
    return (
      <div>
        {this.renderItems()}
      </div>
    )
  }
}

export default Hours
