const express = require('express')
const bodyParser = require('body-parser')

const store = require('./database/store')

const app = express()
const port = process.env.PORT || 3000

app.use((req,res,next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`)
  } else {
    next()
  }
})

app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/new-entry', (req,res) => {
  console.log(req.body)
  store.addEntry({
    start_time: req.body.startTime,
    end_time: req.body.endTime,
    hours_worked: req.body.hoursWorked
  }).then(() => res.sendStatus(200))
})

/* todo: set up server side rendering
app.get('*', (req,res) => {

})*/

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
