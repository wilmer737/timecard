const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const path = require('path')
const moment = require('moment')

const store = require('./database/store')

const app = express()
console.log(process.env)
const port = process.env.PORT || 3000

app.use((req,res,next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`)
  } else {
    next()
  }
})

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/new-entry', (req,res) => {
  store.addEntry({
    start_time: req.body.startTime,
    end_time: req.body.endTime,
    hours_worked: req.body.hoursWorked
  }).then(() => res.sendStatus(200))
})

app.post('/get-initial', (req,res) => {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  store.getInitialData(firstDay, lastDay).then(([data]) => {
    const fullMonth = moment().format('MMMM')
    data.currentDate = `${fullMonth} ${y}`
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.sendStatus(500)
  })
})

/* todo: set up server side rendering
app.get('*', (req,res) => {

})*/

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
