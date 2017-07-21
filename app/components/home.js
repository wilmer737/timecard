import React from 'react'
import {withRouter} from 'react-router-dom'
import {Container, Segment, Card, Statistic, Button} from 'semantic-ui-react'
import 'whatwg-fetch'
import moment from 'moment'

class Home extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Home'
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      currentDate: moment().format('MMMM YYYY'),
      hours: 0,
    }
  }

  componentWillMount() {
    // Fetch initial data
    this.getHoursWorked().then((res) => {
      return res.json()
    }).then(data => {

      const hours = (typeof data.hours === 'undefined' || !data.hours) ? this.state.hours : data.hours
      this.setState({hours})
    }).catch(err => console.log(err))
  }

  handleClick(e) {
    e.preventDefault()

    if (e.target.className.includes('log-time')) {
      this.props.history.push('/log-time')
    } else {
      this.props.history.push('/hours')
    }
  }

  getHoursWorked() {
    return fetch('/get-initial', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    return(
      <Container text textAlign='center'>
        <Segment raised padded='very'>

          <Card color="teal" centered >
            <Card.Content header={this.state.currentDate} />
            <Card.Content>
              <Statistic value={this.state.hours} label="Hours Worked"/>
            </Card.Content>
          </Card>

          <Button className="log-time" color="teal" onClick={this.handleClick}>
            Log Time
          </Button>
          <Button className='old-entries' color="red" onClick={this.handleClick} >
            See Old stuff
          </Button>
        </Segment>
      </Container>
    )
  }
}

export default withRouter(Home)
