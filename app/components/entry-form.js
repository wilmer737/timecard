import moment from 'moment'
import React from 'react'
import {
  Button,
  Container,
  Segment,
  Form,
  Message
} from 'semantic-ui-react'

class EntryForm extends React.Component {
  constructor(props) {
    super(props)

    const {start_time, end_time} = this.props.entry
    this.state = {
      start_time,
      end_time,
      error: false,
      hoursWorked: '',
      errorMessage: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {

  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <Container text>
        <Segment raised padded='very'>
          <Form onSubmit={this.handleSubmit} error={this.state.error}>
            <Form.Field>
              <label>Start Time</label>
              <input type="date" name="startDate" defaultValue={this.state.start_time}
                     onChange={this.handleChange} required/>
              <input type="time" name="startTime" 
                     onChange={this.handleChange} required/>
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <input type="date" name="endDate" defaultValue="2017-05-01"
                     onChange={this.handleChange} required/>
              <input type="time" name="endTime" 
                     onChange={this.handleChange} required/>
            </Form.Field>
            <Message
              error
              header='Error'
              content={this.state.errorMessage}
            />
            <Button color="teal" floated="right">Submit</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default EntryForm
