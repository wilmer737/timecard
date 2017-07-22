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
    // console.log(this.props)
    // this.getEntries().then(res => {
    //   return res.json()
    // }).then(data => {
    //   this.setState({entries: [...data]})
    // }).catch(err => {
    //   return console.log(err)
    // })
  }

  getEntries() {
    return fetch('/get-hours', {method: 'POST'})
  }

  renderItems() {
    return this.state.entries.map(({id, restProps}) => {
      return <Entry key={id} {...restProps} />
    })
  }

  render() {
    return (
      <div>y3
        {this.renderItems()}
      </div>
    )
  }
}

export default Hours
