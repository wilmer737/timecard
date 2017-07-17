import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import Home from './home'
import NewTimeForm from './log-new-time'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <BrowserRouter>
        <div>
          <div><Link to="/">Home Page</Link></div>
          <div><Link to="/log-time">New Time</Link></div>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/log-time" component={NewTimeForm} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
