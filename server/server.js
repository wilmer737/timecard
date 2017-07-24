const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('express-favicon')
const path = require('path')
const moment = require('moment')

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
  store.getInitialData(req.body).then(data => {
    res.json({hours: data})
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

app.post('/get-hours', (req,res) => {
  store.getHours(req.body).then(data => {
    res.json(data) 
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

app.post('/get-entry', (req,res) => {
  store.getEntry(req.body).then(data => {
    console.log(data)
    res.json(data)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

/* todo: set up server side rendering
*/
app.get('*', (req,res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
