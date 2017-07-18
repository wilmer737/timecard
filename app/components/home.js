import React from 'react'
import {withRouter} from 'react-router-dom'
import {Container, Segment, Card, Statistic, Button} from 'semantic-ui-react'


class Home extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Home'
    this.state = {
      hours: 0,
      currentDate: ''
    }

    this.handleClick = this.handleClick.bind(this)

    // Fetch initial data
    this.getHoursWorked().then((res) => {
      return res.json()
    }).then(data => {
      this.setState(data)
    }).catch(err => console.log(err))

  }

  handleClick(e) {
    e.preventDefault()

    this.props.history.push('/log-time')
  }

  getHoursWorked() {
    return window.fetch('/get-initial', {
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

          <Button color="teal" floated="right" onClick={this.handleClick}>
            Log Time
          </Button>
        </Segment>
      </Container>
    )
  }
}

export default withRouter(Home)
