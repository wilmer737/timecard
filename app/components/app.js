import React from 'react'
import {
  Button,
  Container,
  Segment,
  Form
} from 'semantic-ui-react'

class App extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('sup')
  }

  render() {
    return(
      <Container text>
        <Segment raised padded='very'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Start Time</label>
              <input type="date" className="start-date" defaultValue='2017-06-23' />
              <input type="time" className="start-time" />
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <input type="date" className="end-date" defaultValue='2017-06-23' />
              <input type="time" className="end-time" />
            </Form.Field>
            <Button color="teal" floated="right">Submit</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default App
