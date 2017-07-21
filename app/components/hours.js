import React from 'react'
import 'whatwg-fetch'

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
      return console.log(err)
    })
  }

  getEntries() {
    return fetch('/get-hours', {method: 'POST'})
  }

  renderItems() {
    return this.state.entries.map(entry => {
      return <Entry key={entry.id} start_time={entry.start_time} end_time={entry.end_time} />
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
