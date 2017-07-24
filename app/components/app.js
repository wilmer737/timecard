import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import Home from './home'
import NewTimeForm from './log-new-time'
import Hours from './hours'
import Update from './update'
import Create from './create'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <div><Link to="/">Home Page</Link></div>
          <div><Link to="/log-time">New Time</Link></div>
          <div><Link to ="/hours">Logged hours</Link></div> */}
          Timecard app
          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/hours" component={Hours} />
          <Route path="/update/:id" component={Update} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
