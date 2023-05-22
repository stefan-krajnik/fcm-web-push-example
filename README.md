# fcm-web-push-example


Post event listeners in iOS don't work if app is opened from home screen.

In the demo app, I listen on messages posted from service worker.
As you can see in the video on desktop Safari it works as intended but it doesn't on iOS (16.4.1 (a) - iPhone 8)

With further investigation I found out event listeners in service workers are not always called,
if I open the app from home screen clicks on notification don't do anything, but if the app is opened by click on notification then it works as intended, meaning clicks on next notification trigger event listeners in service worker.

Here you can see the reproduction demo https://github.com/stefan-krajnik/fcm-web-push-example
Provide correct firebase config here - https://github.com/stefan-krajnik/fcm-web-push-example/blob/master/index.html#L80
Generate Firebase Admin SDK private key and provide correct path to it - https://github.com/stefan-krajnik/fcm-web-push-example/blob/master/server.js#L5

I deployed the reproduction app to https://fcm-webpush-test.onrender.com
