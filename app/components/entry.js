import React from 'react'
import {Card, Button, Dropdown} from 'semantic-ui-react'
import moment from 'moment'

class Entry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const months = [
      {
        text: 'Janurary',
        value: 'Janurary',
      },
      {
        text: 'February',
        value: 'February',
      }
    ]
    const {start_time, end_time} = this.props
    return (
      <div className="hour-entry">
        <Dropdown placeholder="Pick a Month" selection options={months}/>
        <Card raised>
          <Card.Content header={start_time}/>
          <Card.Content description="8:00am - 530pm" />
          <Card.Content extra >
            <Button color="teal" floated="right">Edit</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }

}

export default Entry