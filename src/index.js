var animatedMirror = require('./animated_mirror')
  , video          = document.querySelector('#mirror')
  , buffer         = document.querySelector('#frame-buffer')
  , output         = document.querySelector('#output')
  , webcamIntro    = document.querySelector('#webcam-intro')
  , webcamThanks   = document.querySelector('#webcam-thanks')

var mirror = animatedMirror(video, buffer, output);

console.log(mirror)

mirror.on('connect', function () {
  console.log('event!')
  webcamIntro.className  = 'webcam-text hidden'
  webcamThanks.className = 'webcam-text'
  setTimeout(function () {
    var webcamMessage = document.querySelector('#webcam-message')
    webcamMessage.className = 'webcam-message-container hidden'
  }, 5000)
})
