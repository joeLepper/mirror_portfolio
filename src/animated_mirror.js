var applyStroke   = require('./apply_stroke')
  , colorShift    = require('./color_shift')
  , getRandomInt  = require('./random_int')
  , webcamIntro   = document.querySelector('#webcam-intro')
  , webcamThanks  = document.querySelector('#webcam-thanks')
  , bufferContext
  , outputContext

module.exports = function (video, buffer, output) {
  navigator.webkitGetUserMedia({ video : true }, function(_stream) {

    bufferContext = buffer.getContext('2d')
    outputContext = output.getContext('2d')

    var brush = setInterval(function () {
      for (var i = 0; i < 100; i ++) {
        applyStroke(outputContext, bufferContext, buffer)
      }
    }, 0)

    document.querySelector('#mirror').setAttribute('src', window.URL.createObjectURL(_stream))
    webcamIntro.className = 'webcam-text hidden'
    webcamThanks.className = 'webcam-text'
    setTimeout(function () {
      var webcamMessage = document.querySelector('#webcam-message')
      webcamMessage.className = 'webcam-message-container hidden'
    }, 5000)
    shutter()
  })

  function shutter () {
    setTimeout(function () {
      closeShutter(video, buffer, bufferContext)
      shutter()
    }, getRandomInt(100, 150))
  }
}

function closeShutter (vid, buf, ctx) {
  ctx.drawImage( vid
               , 0
               , 0
               , vid.videoWidth
               , vid.videoHeight
               , 0
               , 0
               , buf.width
               , buf.height
               )
}