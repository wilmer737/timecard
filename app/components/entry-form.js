import moment from 'moment'
import React from 'react'
import {
  Button,
  Container,
  Segment,
  Form,
  Message
} from 'semantic-ui-react'
import 'whatwg-fetch'

class EntryForm extends React.Component {
  constructor(props) {
    super(props)

    const date = moment(this.props.start_time)
    this.state = {
      startDate: date.format('YYYY-MM-DD'),
      startTime: '',
      endDate: date.format('YYYY-MM-DD'),
      endTime: '',
      error: false,
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const {name, value} = e.target
    const data = {[name]: value, error: false}
    return this.setState(data)
  }

  handleSubmit(e) {
    e.preventDefault()

    const startDateTime = `${this.state.startDate} ${this.state.startTime}`
    const endDateTime = `${this.state.endDate} ${this.state.endTime}`

    const data = {}
    try {
      this.validateForm()
      data.startTime = moment(startDateTime).format('YYYY-MM-DD HH:mm:ss')//new Date(startDateTime).toISOString().slice(0, 19).replace('T', ' ')
      data.endTime = moment(endDateTime).format('YYYY-MM-DD HH:mm:ss')//new Date(endDateTime).toISOString().slice(0, 19).replace('T', ' ')
      data.hoursWorked = this.calculateHours(startDateTime, endDateTime)
      this.submitForm(data)
    } catch (err) {
      return this.setState({error: true, errorMessage: err.message})
    }
  }

  submitForm(data) {
    return fetch('/new-entry', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => (this.props.handleSubmit())).catch(err => {
      throw new Error('failed to retrieve data')
    })
  }

  validateForm() {
    const end = moment(`${this.state.endDate} ${this.state.endTime}`)
    const begin = moment(`${this.state.startDate} ${this.state.startTime}`)

    if (end.isBefore(begin)) {
       throw new Error('Can\'t be doing this man')
    }
    
    return true
  }

  calculateHours(startDateTime, endDateTime) {
    const startTime = moment(startDateTime)
    const endTime = moment(endDateTime)

    const duration = moment.duration(endTime.diff(startTime))
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) - hours * 60

    return this.timeToDecimal(`${hours}:${minutes}`)
  }

  timeToDecimal(t) {
    const arr = t.split(':');
    return parseFloat(parseInt(arr[0], 10) + '.' + parseInt((arr[1] / 6) * 10, 10));
  }

  render() {
    const {start_time, end_time} = this.props
    const {startDate} = this.state

    return (
      <Container text>
        <Segment raised padded='very'>
          <Form onSubmit={this.handleSubmit} error={this.state.error}>
            <Form.Field>
              <label>Start Time</label>
              <input type="date" name="startDate" defaultValue={startDate}
                     onChange={this.handleChange} required/>
              <input type="time" name="startTime" 
                     onChange={this.handleChange} required/>
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <input type="date" name="endDate" defaultValue={startDate}
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
