const { appData } = require('./appData')
const { generateAppDataView } = require('./generateAppDataView')
const { generateNumber } = require('./generateNumber')
const { updateTickets } = require('./updateTickets')
const { generateTickets } = require('./generateTickets')
const { getSingleTicketView } = require('./getSingleTicketView')
const { addPerson } = require('./addPerson')
const express = require('express')
const nocache = require('nocache')
const app = express()
app.use(nocache())
const port = 3000

app.get('/', (req, res) => res.send('Hello Housie!'))

app.get('/showRawAppData', (req, res) => res.send(appData))

app.get('/showAppData', (req, res) => res.send(generateAppDataView(appData)))

app.get('/generateNumber', (req, res) => res.send(generateNumber(appData)))

app.get('/updateTickets', (req, res) => res.send(updateTickets(appData)))

app.get('/generateNumberAndUpdateTickets', (req, res) => res.send(`generatedNumber: ${generateNumber(appData)} updateTickets:${updateTickets(appData)}`))

app.get('/generateTickets', (req, res) => res.send(generateTickets(appData)))

app.get('/ticket/:personName', (req, res) => res.send(getSingleTicketView(appData, req.params, req.query)))

app.get('/add/:personName', (req, res) => res.send(addPerson(appData, req.params)))

app.listen(port, () => console.log(`Housie app listening at http://localhost:${port}`))