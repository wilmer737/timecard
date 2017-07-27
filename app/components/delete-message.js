import React from 'react'
import {Message} from 'semantic-ui-react'

class DeleteMessage extends React.Component {
  constructor(props) {
    super(props)

  }

  handleDismiss() {
    
  }

  render() {
    const {handleDismiss, ...restOfProps} = this.props
    return (
      <Message onDismiss={handleDismiss} {...restOfProps}/>
    )
  }
}

export default DeleteMessage
