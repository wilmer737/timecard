import React from 'react'
import {Card, Button, Dropdown} from 'semantic-ui-react'
import moment from 'moment'

const Entry = ({start_time,end_time,current_day}) => (
  <div className="hour-entry">
    <Card raised>
      <Card.Content header={moment(current_day).format('MMMM Do')}/>
      <Card.Content description={`${start_time} - ${end_time}`} />
      <Card.Content extra >
        <Button color="teal" floated="right">Edit</Button>
      </Card.Content>
    </Card>
  </div>
)

export default Entry