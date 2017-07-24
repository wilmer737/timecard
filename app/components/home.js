import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Segment, Card, Statistic, Button} from 'semantic-ui-react'
import 'whatwg-fetch'
import moment from 'moment'

class Home extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props)

    document.title = 'Home'
    this.state = {
      currentDate: moment().format('MMMM YYYY'),
      hours: 0,
    }
  }

  /**
   * Fetches initial data for the state
   */
  componentWillMount() {
    this.getHoursWorked().then((res) => {
      return res.json()
    }).then(data => {
      const hours = (typeof data.hours === 'undefined' || !data.hours) ? this.state.hours : data.hours
      this.setState({hours})
    }).catch(err => console.log(err.message))
  }

  getHoursWorked() {
    const today = moment()
    const firstDay = today.startOf('month').format('YYYY-MM-DD')
    const lastDay = today.endOf('month').format('YYYY-MM-DD')

    return fetch('/get-initial', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstDay, lastDay})
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

          <Link to="/create">
            <Button className="log-time" color="teal" content="Create" />
          </Link>

          <Link to="/hours">
            <Button className='old-entries' color="red" onClick={this.handleClick} content="See Hours"/>
          </Link>

        </Segment>
      </Container>
    )
  }
}

export default Home
