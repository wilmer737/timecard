import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button, Dropdown, Container, Segment} from 'semantic-ui-react'
import moment from 'moment'

const Entry = ({start_time,end_time,current_day,id}) => (
  <Container className="hour-entry">
    <Segment padded='very'>
      <Card raised>
        <Card.Content header={moment(current_day).format('MMMM Do')}/>
        <Card.Content description={`${start_time} - ${end_time}`} />
        <Card.Content extra >
          <Link to={`/update/${id}`}><Button color="teal" floated="right">Edit</Button></Link>
        </Card.Content>
      </Card>
    </Segment>
  </Container>
)

export default Entry
