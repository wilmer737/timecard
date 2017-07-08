const express = require('express')
const bodyParser = require('body-parser')

const store = require('./database/store')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/new-entry', (req,res) => {
  store.addEntry().then(() => res.sendStatus(200))
})

app.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`)
})
