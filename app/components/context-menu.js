import React from 'react'
import {Button, Popup, Icon} from 'semantic-ui-react'

const ContextMenu = ({handleDeleteClick,id}) => (
  <Popup 
    trigger={<Icon name='ellipsis vertical' color='teal' />}
    content={<Button basic fluid onClick={() => handleDeleteClick(id)} >Delete Record</Button>}
    position='bottom center'
  />
)
export default ContextMenu
