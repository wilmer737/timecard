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

    this.state = {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      error: false,
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {start_time, end_time} = this.props
    const start = moment(start_time)
    const end = moment(end_time)
    
    return this.setState({
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      startTime: start.format('H:mm'),
      endTime: end.format('H:mm')
    })
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
      data.start_time = moment(startDateTime).format('YYYY-MM-DD HH:mm:ss')
      data.end_time = moment(endDateTime).format('YYYY-MM-DD HH:mm:ss')
      data.hours_worked = this.calculateHours(startDateTime, endDateTime)
      this.props.submitForm(data)
    } catch (err) {
      return this.setState({error: true, errorMessage: err.message})
    }
  }

  validateForm() {
    const end = moment(`${this.state.endDate} ${this.state.endTime}`)
    const begin = moment(`${this.state.startDate} ${this.state.startTime}`)

    if (!moment(this.state.startDate).isSame(this.state.endDate)|| end.isBefore(begin)) {
       throw new Error('😡 Make sure both start date and end date are the same day')
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
    const start = moment(start_time)
    const end = moment(end_time)
    return (
      <Container text>
        <Segment raised padded='very'>
          <Form onSubmit={this.handleSubmit} error={this.state.error}>
            <Form.Field>
              <label>Start Time</label>
              <input type="date" name="startDate" defaultValue={start.format('YYYY-MM-DD')}
                     onChange={this.handleChange} required/>
              <input type="time" name="startTime" defaultValue={start.format('H:mm')}
                     onChange={this.handleChange} required/>
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <input type="date" name="endDate" defaultValue={end.format('YYYY-MM-DD')}
                     onChange={this.handleChange} required/>
              <input type="time" name="endTime" defaultValue={end.format('H:mm')}
                     onChange={this.handleChange} required/>
            </Form.Field>
            <Message
              error
              header='Error'
              content={this.state.errorMessage}
            />
            <Button color="teal" floated="right" type="submit">Submit</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}

export default EntryForm
