const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const admin = require('firebase-admin')
const serviceAccount = require('./fcm-webpush-example-firebase-adminsdk-gr7zn-6418cf6770.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

let subscriptions = []

function sendNotifications(subscriptions) {
  subscriptions.forEach((subscription) => {
    const registrationToken = subscription.endpoint
    admin
      .messaging()
      .send({
        token: registrationToken,
        notification: {
          title: 'Notification Title',
          body: 'This is an example notification',
        },
        webpush: {
          fcmOptions: {
            link: '/notification-action-target',
          },
        },
      })
      .then((response) => {
        // res.status(200).send('Notification sent successfully' + response)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

const app = express()

app.use(bodyparser.json())
app.use(express.static('./'))

app.post('/add-subscription', (request, response) => {
  console.log(`Subscribing ${request.body.endpoint}`)
  subscriptions.push(request.body)
  response.sendStatus(200)
})

app.post('/remove-subscription', (request, response) => {
  console.log(`Unsubscribing ${request.body.endpoint}`)
  subscriptions = subscriptions.filter(({ endpoint }) => endpoint !== request.body.endpoint)
  response.sendStatus(200)
})

app.post('/notify-me', (request, response) => {
  console.log(`Notifying ${request.body.endpoint}`)
  const subscription = subscriptions.find(({ endpoint }) => endpoint === request.body.endpoint)
  if (subscription) {
    sendNotifications([subscription])
    response.sendStatus(200)
  } else {
    response.sendStatus(409)
  }
})

app.post('/notify-all', (request, response) => {
  console.log('Notifying all subscribers')
  if (subscriptions.length > 0) {
    sendNotifications(subscriptions)
    response.sendStatus(200)
  } else {
    response.sendStatus(409)
  }
})

app.get('/', (request, response) => {
  response.sendFile('index.html', { root: path.join(__dirname, '') })
})

app.get('/start', (request, response) => {
  response.sendFile('start.html', { root: path.join(__dirname, '') })
})

app.get('/notification-action-target', (request, response) => {
  response.sendFile('notification-action-target.html', { root: path.join(__dirname, '') })
})

const listener = app.listen(3000, async () => {
  console.log(`Listening on port ${listener.address().port}`)
})
