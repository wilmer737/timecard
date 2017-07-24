import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button, Dropdown} from 'semantic-ui-react'
import moment from 'moment'

const Entry = ({start_time,end_time,current_day,id}) => (
  <div className="hour-entry">
    <Card raised>
      <Card.Content header={moment(current_day).format('MMMM Do')}/>
      <Card.Content description={`${start_time} - ${end_time}`} />
      <Card.Content extra >
        <Link to={`/update/${id}`}><Button color="teal" floated="right">Edit</Button></Link>
      </Card.Content>
    </Card>
  </div>
)

export default Entry