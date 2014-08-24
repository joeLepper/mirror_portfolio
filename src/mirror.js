var animatedMirror = require('./animated_mirror')
  , video          = document.querySelector('#mirror')
  , buffer         = document.querySelector('#frame-buffer')
  , output         = document.querySelector('#output')
  , webcamIntro    = document.querySelector('#webcam-intro')
  , webcamThanks   = document.querySelector('#webcam-thanks')
  , mirror         = animatedMirror(video, buffer, output)
  , gifulate       = require('./gifulator')
  , controls       = require('./controls')

  , safetyValve = 0

var gifButton = document.querySelector('#gifulate')

gifButton.addEventListener('click', function () {
  console.log('click event!')
  gifulate(video, document.querySelector('#gifulator'), output)
})

mirror.on('data', function (event) {
  if (!safetyValve) {

    window.evt = event
    safetyValve = 1
  }
})

controls()
