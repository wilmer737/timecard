import React from 'react'
import {Message} from 'semantic-ui-react'

const DeleteMessage = ({handleDismiss, ...restOfProps}) => (
  <Message onDismiss={handleDismiss} {...restOfProps} />
)

export default DeleteMessage
