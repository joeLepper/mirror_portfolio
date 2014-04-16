var animatedMirror = require('./animated_mirror')
  , video          = document.querySelector('#mirror')
  , buffer         = document.querySelector('#frame-buffer')
  , output         = document.querySelector('#output')
  , webcamIntro    = document.querySelector('#webcam-intro')
  , webcamThanks   = document.querySelector('#webcam-thanks')
  , mirror         = animatedMirror(video, buffer, output);
