import React from 'react'
import {
  Button,
  Container,
  Segment,
  Form
} from 'semantic-ui-react'
import moment from 'moment'

class NewTimeForm extends React.Component {
  constructor(props) {
    super(props)
    document.title = 'Log New time'

    const todayFormatted = moment().format('YYYY-MM-DD')
    this.state = {
      startDate: todayFormatted,
      startTime: '',
      endDate: todayFormatted,
      endTime: '',
      hoursWorked: '',
      today: todayFormatted
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()


  }

  handleChange(e) {
    console.log("This", this, "E", e.target, e.target.value)
  }

  render() {
    return(
      <Container text>
        <Segment raised padded='very'>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Start Time</label>
              <input type="date" className="start-date" defaultValue={this.state.today} onChange={this.handleChange} required/>
              <input type="time" className="start-time" onChange={this.handleChange} required />
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <input type="date" className="end-date" defaultValue={this.state.today} onChange={this.handleChange} required />
              <input type="time" className="end-time" onChange={this.handleChange} required />
            </Form.Field>
            <Button color="teal" floated="right">Submit</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default NewTimeForm
