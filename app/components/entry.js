import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button, Dropdown, Container, Segment, Icon} from 'semantic-ui-react'
import moment from 'moment'

import ContextMenu from './context-menu'

const Entry = ({start_time,end_time,current_day,id, handleDeleteClick}) => (
  <Container className="hour-entry">
    <Segment padded='very'>
      <Card raised>
        <Card.Content>
          <Card.Header>
            <ContextMenu  handleDeleteClick={handleDeleteClick} id={id} />
            {moment(current_day).format('MMMM Do')}
          </Card.Header>
        </Card.Content>
        <Card.Content description={`${start_time} - ${end_time}`} />
        <Card.Content extra >
          <Link to={`/update/${id}`}><Button color="teal" floated="right">Edit</Button></Link>
        </Card.Content>
      </Card>
    </Segment>
  </Container>
)

export default Entry
