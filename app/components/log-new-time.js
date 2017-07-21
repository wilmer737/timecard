import React from 'react'
import {
  Button,
  Container,
  Segment,
  Form,
  Message
} from 'semantic-ui-react'
import moment from 'moment'
import 'whatwg-fetch'
import path from 'path'

class NewTimeForm extends React.Component {
  /**
   * Constructor
   * @param props
   */
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
      today: todayFormatted,
      error: false,
      errorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Validates form
   */
  validateForm() {
    if (moment(`${this.state.endDate} ${this.state.endTime}`).isBefore(`${this.state.startDate} ${this.state.startTime}`)) {
      throw new Error('Start Date has to be before End Date')
    }

  }

  /**
   * Converts string representing HH:mm to decimal and returns the value
   * @param t
   * @returns {Number}
   */
  timeToDecimal(t) {
    const arr = t.split(':');
    return parseFloat(parseInt(arr[0], 10) + '.' + parseInt((arr[1] / 6) * 10, 10));
  }

  calculateHours(startDateTime, endDateTime) {
    const startTime = moment(startDateTime)
    const endTime = moment(endDateTime)

    const duration = moment.duration(endTime.diff(startTime))
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) - hours * 60

    return this.timeToDecimal(`${hours}:${minutes}`)
  }

  /**
   * Submits the data of the form
   *
   * @param e
   * @returns {*}
   */
  handleSubmit(e) {
    e.preventDefault()

    const startDateTime = `${this.state.startDate} ${this.state.startTime}`
    const endDateTime = `${this.state.endDate} ${this.state.endTime}`

    const data = {}
    try {
      this.validateForm()
      data.startTime = new Date(startDateTime).toISOString().slice(0, 19).replace('T', ' ')
      data.endTime = new Date(endDateTime).toISOString().slice(0, 19).replace('T', ' ')
      data.hoursWorked = this.calculateHours(startDateTime, endDateTime)
    } catch (err) {
      this.setState({error: true, errorMessage: err.message})
    }
  

    return fetch('/new-entry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  /**
   * Handles change
   *
   * @param e
   */
  handleChange(e) {
    const {name, value} = e.target
    const data = {[name]: value, error: false}

    this.setState(data)
  }

  /**
   * Renders component
   * @returns
   */
  render() {
    return (
      <Container text>
        <Segment raised padded='very'>
          <Form onSubmit={this.handleSubmit} error={this.state.error}>
            <Form.Field>
              <label>Start Time</label>
              <input type="date" name="startDate" defaultValue={this.state.today}
                     onChange={this.handleChange} required/>
              <input type="time" name="startTime" onChange={this.handleChange} required/>
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <input type="date" name="endDate" defaultValue={this.state.today} onChange={this.handleChange}
                     required/>
              <input type="time" name="endTime" onChange={this.handleChange} required/>
            </Form.Field>
            <Message
              error
              header='Error'
              content='Start Date has to be before End Date'
            />
            <Button color="teal" floated="right">Submit</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default NewTimeForm
