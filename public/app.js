const form = document.querySelector('.new-entry')

form.addEventListener('submit', e => {
  e.preventDefault()

  const startTime = form.querySelector('#start_time').value
  const endTime = form.querySelector('#end_time').value
  post('/new-entry', {startTime, endTime})
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