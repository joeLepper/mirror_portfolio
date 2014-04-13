(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var colorShift   = require('./color_shift')
  , getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')

module.exports = function applyStroke (oCtx, bCtx, bCan) {
  var x = Math.floor(Math.random() * bCan.width)
    , y = Math.floor(Math.random() * bCan.height)

  var imgData = bCtx.getImageData(x, y, 1, 1)
    , r = colorShift(imgData.data[0])
    , g = imgData.data[1]
    , b = colorShift(imgData.data[2])
    , a = getRandomInt(0,10) / 11

  var points = []
  coinFlip() ? drawLittleDot() : drawBigDot()

  oCtx.lineJoin = oCtx.lineCap = 'round'
  var colorString = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ');'

  oCtx.fillStyle = colorString

  for (var i = 0; i < points.length; i++) {

    oCtx.beginPath()
    oCtx.globalAlpha = points[i].opacity
    oCtx.arc(
      points[i].x, points[i].y, points[i].radius,
      false, Math.PI * 2, false)
    oCtx.fill()
  }

  function drawBigDot () {
    points.push({
      x: x,
      y: y,
      radius: getRandomInt(1, 2),
      opacity: Math.random()
    })
  }

  function drawLittleDot () {
    points.push({
      x: x,
      y: y,
      radius: getRandomInt(1, 3),
      opacity: Math.random()
    })
  }
}
},{"./coin_flip":2,"./color_shift":3,"./random_int":5}],2:[function(require,module,exports){
module.exports = function coinFlip () {
    return Math.floor(Math.random() * 2)
}
},{}],3:[function(require,module,exports){
var getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')

module.exports = function colorShift (val) {
  var shift = getRandomInt(5, 50)
  if (coinFlip()) { shift *= -1 }
  return shift + val
}

},{"./coin_flip":2,"./random_int":5}],4:[function(require,module,exports){
var applyStroke   = require('./apply_stroke')
  , colorShift    = require('./color_shift')
  , getRandomInt  = require('./random_int')
  , video         = document.querySelector('#mirror')
  , buffer        = document.querySelector('#frame-buffer')
  , output        = document.querySelector('#output')
  , webcamIntro   = document.querySelector('#webcam-intro')
  , webcamThanks  = document.querySelector('#webcam-thanks')
  , bufferContext = buffer.getContext('2d')
  , outputContext = output.getContext('2d')

navigator.webkitGetUserMedia({ video : true }, function(_stream) {

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
  }, 10000)
  shutter()

  function shutter () {
    setTimeout(function () {
      closeShutter(video, buffer, bufferContext)
      shutter()
    }, getRandomInt(100, 250))
  }
})

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

},{"./apply_stroke":1,"./color_shift":3,"./random_int":5}],5:[function(require,module,exports){
module.exports = function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamxlcHBlci9fcGVyc29uYWwvaW1wcmVzc2lvbmlzdC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2psZXBwZXIvX3BlcnNvbmFsL2ltcHJlc3Npb25pc3Qvc3JjL2FwcGx5X3N0cm9rZS5qcyIsIi9Vc2Vycy9qbGVwcGVyL19wZXJzb25hbC9pbXByZXNzaW9uaXN0L3NyYy9jb2luX2ZsaXAuanMiLCIvVXNlcnMvamxlcHBlci9fcGVyc29uYWwvaW1wcmVzc2lvbmlzdC9zcmMvY29sb3Jfc2hpZnQuanMiLCIvVXNlcnMvamxlcHBlci9fcGVyc29uYWwvaW1wcmVzc2lvbmlzdC9zcmMvZmFrZV9hOGEzY2ZlLmpzIiwiL1VzZXJzL2psZXBwZXIvX3BlcnNvbmFsL2ltcHJlc3Npb25pc3Qvc3JjL3JhbmRvbV9pbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGNvbG9yU2hpZnQgICA9IHJlcXVpcmUoJy4vY29sb3Jfc2hpZnQnKVxuICAsIGdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vcmFuZG9tX2ludCcpXG4gICwgY29pbkZsaXAgICAgID0gcmVxdWlyZSgnLi9jb2luX2ZsaXAnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFwcGx5U3Ryb2tlIChvQ3R4LCBiQ3R4LCBiQ2FuKSB7XG4gIHZhciB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYkNhbi53aWR0aClcbiAgICAsIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBiQ2FuLmhlaWdodClcblxuICB2YXIgaW1nRGF0YSA9IGJDdHguZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpXG4gICAgLCByID0gY29sb3JTaGlmdChpbWdEYXRhLmRhdGFbMF0pXG4gICAgLCBnID0gaW1nRGF0YS5kYXRhWzFdXG4gICAgLCBiID0gY29sb3JTaGlmdChpbWdEYXRhLmRhdGFbMl0pXG4gICAgLCBhID0gZ2V0UmFuZG9tSW50KDAsMTApIC8gMTFcblxuICB2YXIgcG9pbnRzID0gW11cbiAgY29pbkZsaXAoKSA/IGRyYXdMaXR0bGVEb3QoKSA6IGRyYXdCaWdEb3QoKVxuXG4gIG9DdHgubGluZUpvaW4gPSBvQ3R4LmxpbmVDYXAgPSAncm91bmQnXG4gIHZhciBjb2xvclN0cmluZyA9ICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBhICsgJyk7J1xuXG4gIG9DdHguZmlsbFN0eWxlID0gY29sb3JTdHJpbmdcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgb0N0eC5iZWdpblBhdGgoKVxuICAgIG9DdHguZ2xvYmFsQWxwaGEgPSBwb2ludHNbaV0ub3BhY2l0eVxuICAgIG9DdHguYXJjKFxuICAgICAgcG9pbnRzW2ldLngsIHBvaW50c1tpXS55LCBwb2ludHNbaV0ucmFkaXVzLFxuICAgICAgZmFsc2UsIE1hdGguUEkgKiAyLCBmYWxzZSlcbiAgICBvQ3R4LmZpbGwoKVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0JpZ0RvdCAoKSB7XG4gICAgcG9pbnRzLnB1c2goe1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICByYWRpdXM6IGdldFJhbmRvbUludCgxLCAyKSxcbiAgICAgIG9wYWNpdHk6IE1hdGgucmFuZG9tKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0xpdHRsZURvdCAoKSB7XG4gICAgcG9pbnRzLnB1c2goe1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICByYWRpdXM6IGdldFJhbmRvbUludCgxLCAzKSxcbiAgICAgIG9wYWNpdHk6IE1hdGgucmFuZG9tKClcbiAgICB9KVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb2luRmxpcCAoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXG59IiwidmFyIGdldFJhbmRvbUludCA9IHJlcXVpcmUoJy4vcmFuZG9tX2ludCcpXG4gICwgY29pbkZsaXAgICAgID0gcmVxdWlyZSgnLi9jb2luX2ZsaXAnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbG9yU2hpZnQgKHZhbCkge1xuICB2YXIgc2hpZnQgPSBnZXRSYW5kb21JbnQoNSwgNTApXG4gIGlmIChjb2luRmxpcCgpKSB7IHNoaWZ0ICo9IC0xIH1cbiAgcmV0dXJuIHNoaWZ0ICsgdmFsXG59XG4iLCJ2YXIgYXBwbHlTdHJva2UgICA9IHJlcXVpcmUoJy4vYXBwbHlfc3Ryb2tlJylcbiAgLCBjb2xvclNoaWZ0ICAgID0gcmVxdWlyZSgnLi9jb2xvcl9zaGlmdCcpXG4gICwgZ2V0UmFuZG9tSW50ICA9IHJlcXVpcmUoJy4vcmFuZG9tX2ludCcpXG4gICwgdmlkZW8gICAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtaXJyb3InKVxuICAsIGJ1ZmZlciAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZnJhbWUtYnVmZmVyJylcbiAgLCBvdXRwdXQgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI291dHB1dCcpXG4gICwgd2ViY2FtSW50cm8gICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWJjYW0taW50cm8nKVxuICAsIHdlYmNhbVRoYW5rcyAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2ViY2FtLXRoYW5rcycpXG4gICwgYnVmZmVyQ29udGV4dCA9IGJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpXG4gICwgb3V0cHV0Q29udGV4dCA9IG91dHB1dC5nZXRDb250ZXh0KCcyZCcpXG5cbm5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEoeyB2aWRlbyA6IHRydWUgfSwgZnVuY3Rpb24oX3N0cmVhbSkge1xuXG4gIHZhciBicnVzaCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSArKykge1xuICAgICAgYXBwbHlTdHJva2Uob3V0cHV0Q29udGV4dCwgYnVmZmVyQ29udGV4dCwgYnVmZmVyKVxuICAgIH1cbiAgfSwgMClcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWlycm9yJykuc2V0QXR0cmlidXRlKCdzcmMnLCB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChfc3RyZWFtKSlcbiAgd2ViY2FtSW50cm8uY2xhc3NOYW1lID0gJ3dlYmNhbS10ZXh0IGhpZGRlbidcbiAgd2ViY2FtVGhhbmtzLmNsYXNzTmFtZSA9ICd3ZWJjYW0tdGV4dCdcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHdlYmNhbU1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2ViY2FtLW1lc3NhZ2UnKVxuICAgIHdlYmNhbU1lc3NhZ2UuY2xhc3NOYW1lID0gJ3dlYmNhbS1tZXNzYWdlLWNvbnRhaW5lciBoaWRkZW4nXG4gIH0sIDEwMDAwKVxuICBzaHV0dGVyKClcblxuICBmdW5jdGlvbiBzaHV0dGVyICgpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGNsb3NlU2h1dHRlcih2aWRlbywgYnVmZmVyLCBidWZmZXJDb250ZXh0KVxuICAgICAgc2h1dHRlcigpXG4gICAgfSwgZ2V0UmFuZG9tSW50KDEwMCwgMjUwKSlcbiAgfVxufSlcblxuZnVuY3Rpb24gY2xvc2VTaHV0dGVyICh2aWQsIGJ1ZiwgY3R4KSB7XG4gIGN0eC5kcmF3SW1hZ2UoIHZpZFxuICAgICAgICAgICAgICAgLCAwXG4gICAgICAgICAgICAgICAsIDBcbiAgICAgICAgICAgICAgICwgdmlkLnZpZGVvV2lkdGhcbiAgICAgICAgICAgICAgICwgdmlkLnZpZGVvSGVpZ2h0XG4gICAgICAgICAgICAgICAsIDBcbiAgICAgICAgICAgICAgICwgMFxuICAgICAgICAgICAgICAgLCBidWYud2lkdGhcbiAgICAgICAgICAgICAgICwgYnVmLmhlaWdodFxuICAgICAgICAgICAgICAgKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRSYW5kb21JbnQgKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluXG59XG4iXX0=
