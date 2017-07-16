import React from 'react'
import {withRouter} from 'react-router-dom'
import {Container, Segment, Card, Statistic, Button} from 'semantic-ui-react'


class Home extends React.Component {
  constructor(props) {
    super(props)

    document.title = 'Home'
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()

    this.props.history.push('/log-time')
  }

  render() {
    return(
      <Container text textAlign='center'>
        <Segment raised padded='very'>

          <Card color="teal" centered >
            <Card.Content header="July 2017" />
            <Card.Content>
              <Statistic value="3000" label="Hours Worked"/>
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
