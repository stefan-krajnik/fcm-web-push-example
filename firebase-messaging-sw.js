importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js')

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', (e) => {
  e.waitUntil(onPush(e))
})

firebase.initializeApp({
  apiKey: "AIzaSyCJr3hKkjZcsH9ppTDI_fEVNb-vvOqHdTw",
  authDomain: "fcm-webpush-example.firebaseapp.com",
  projectId: "fcm-webpush-example",
  storageBucket: "fcm-webpush-example.appspot.com",
  messagingSenderId: "577821384473",
  appId: "1:577821384473:web:8f1263479ea9922c8b6f88",
  measurementId: "G-K1L2RVB3M7"
})

const messaging = firebase.messaging()

/**
 * @returns If there is currently a visible WindowClient, this method will resolve to true,
 * otherwise false.
 */
function hasVisibleClients(clientList) {
  return clientList.some(
    (client) =>
      client.visibilityState === 'visible' &&
      // Ignore chrome-extension clients as that matches the background pages of extensions, which
      // are always considered visible for some reason.
      !client.url.startsWith('chrome-extension://')
  )
}

function getClientList() {
  return self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  })
}

async function onPush(event) {
  try {
    const clientList = await getClientList()
    if (hasVisibleClients(clientList)) {
      const data = event.data.json()

      debugger
      const newNotification = {
        ...data.notification,
        data: {
          FCM_MSG: data,
        },
      }

      return self.registration.showNotification(newNotification.title, newNotification)
    }
  } catch {
    // ignore error
  }
}
