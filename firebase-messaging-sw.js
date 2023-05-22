importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js')

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
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

firebase.messaging()
