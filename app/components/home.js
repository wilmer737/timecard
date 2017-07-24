import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Segment, Card, Statistic, Button, Icon, Loader} from 'semantic-ui-react'
import 'whatwg-fetch'
import moment from 'moment'

class Home extends React.Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props)

    document.title = 'Home'
    this.state = {hours: 0, isLoading: true}
  }

  /**
   * Fetches initial data for the state
   */
  componentDidMount() {
    this.getHoursWorked().then((res) => {
      return res.json()
    }).then(data => {
      const hours = (typeof data.hours === 'undefined' || !data.hours) ? this.state.hours : data.hours
      return this.setState({hours, isLoading: false})
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
    const {hours, isLoading} = this.state
    return(
      <Container text textAlign='center'>
        <Segment raised padded='very'>

          <Card color="teal" centered >
            <Card.Content header={moment().format('MMMM YYYY')} />
            <Card.Content>
              {isLoading ? <Loader active inline/> : <Statistic value={hours} label="Hours Worked"/>}
            </Card.Content>
          </Card>

          <Link to="/create">
            <Button className="log-time" color="teal" content="Log Time" />
          </Link>

          <Link to="/hours">
            <Button className='old-entries' color="red" content="See Hours"/>
          </Link>

        </Segment>
      </Container>
    )
  }
}

export default Home
