import moment from 'moment'
import 'whatwg-fetch'

const getHoursWorked = () => {
  const today = moment()
  const firstDay = today.startOf('month').format('YYYY-MM-DD')
  const lastDay = today.endOf('month').endOf('day').format('YYYY-MM-DD H:m:s')

  return fetch('/get-initial', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({firstDay, lastDay})
  })
}


module.exports = {
  getHoursWorked
}