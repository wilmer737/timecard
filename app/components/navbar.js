import React from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: '/'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, {name}) {
    return this.setState({activeItem: name})
  }

  render() {
    const {activeItem} = this.state
    return (
      <Menu inverted color='teal' size='large'>
        <Menu.Item name='/' header as={Link} to='/' active={activeItem === '/'} onClick={this.handleClick} >TimeKeeper</Menu.Item>
        <Menu.Item name='create' as={Link} to='/create' active={activeItem === 'create'} onClick={this.handleClick} >Log Hours</Menu.Item>
        <Menu.Item name='hours' as={Link} to='/hours' active={activeItem === 'hours'} onClick={this.handleClick} >View Hours</Menu.Item>        
      </Menu>
    )
  }
}

export default Navbar
