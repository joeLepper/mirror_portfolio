var video          = document.querySelector('#mirror')
  , buffer         = document.querySelector('#frame-buffer')
  , output         = document.querySelector('#output')
  , animatedMirror = require('./animated_mirror')

animatedMirror(video, buffer, output);
