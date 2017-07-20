import React from 'react'
import {Card, Button, Dropdown} from 'semantic-ui-react'

class Hours extends React.Component {
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
    return (
      <div className="hour-entry">
        <Dropdown placeholder="Pick a Month" selection options={months}/>
        <Card raised>
          <Card.Content header="July 20, 2017"/>
          <Card.Content description="8:00am - 530pm" />
          <Card.Content extra >
            <Button color="teal" floated="right">Edit</Button>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default Hours
