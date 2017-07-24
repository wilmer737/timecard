import React from 'react'
import {
  BrowserRouter,
  Route,
  Link,
  NavLink
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
          <NavLink to='/' exact activeStyle={{fontWeight:'bold',color:'teal'}} >Home</NavLink>&nbsp;
          <NavLink to='/create' exact activeStyle={{fontWeight:'bold',color:'teal'}} >Create</NavLink>
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
