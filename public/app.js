const form = document.querySelector('.new-entry')

form.addEventListener('submit', e => {
  e.preventDefault()
  let data = {}
  const startDate = form.querySelector('#start-date').value
  const startTime = form.querySelector('#start-time').value
  data.startTime = new Date(`${startDate} ${startTime}`).toISOString().slice(0,19).replace('T', ' ')

  const endDate = form.querySelector('#end-date').value
  const endTime = form.querySelector('#end-time').value
  data.endTime = new Date(`${endDate} ${endTime}`).toISOString().slice(0,19).replace('T', ' ')

  data.hoursWorked = 1
  console.log(data)
  post('/new-entry', data)

})


const post = (path, data) => {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
