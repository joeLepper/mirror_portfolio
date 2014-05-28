module.exports = function dynamicSelfie (video, canvas, mirror) {
  var encoder = new GIFEncoder()
    , ctx     = canvas.getContext('2d')
    , frame   = 0
    , clock

  window.encoder = encoder

  console.log(ctx)
  console.log(window)

  encoder.setRepeat(0)
  encoder.setDelay(100)
  encoder.start()

  console.log('gif!')

  clock = setInterval(function () {
    console.log('snap')
    var videoWidth  = video.videoWidth
      , videoHeight = video.videoHeight
      , totalFrames = 20
      , binaryGif

    if (frame >= totalFrames) {
      encoder.finish()
      binaryGif = encoder.stream().getData()
      console.log(binaryGif)
      clearInterval(clock)
    }
    else {
      console.log(mirror, videoWidth, videoHeight)
      ctx.drawImage(mirror, 0, 0, videoWidth, videoHeight, 0, 0, videoWidth / 3, videoHeight / 3)
      encoder.addFrame(ctx)
      frame++
    }
  }, 100)
}

function uploadSelfie (imageData) {
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  }
  xmlhttp.onreadystatechange=function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(xmlhttp.responseText)
    }
    else if (xmlhttp.status === 400) {
      console.log(xmlhttp)
    }
  }

  console.log(imageData)

  xmlhttp.open('POST', 'https://api.imgur.com/3/upload', true);
  xmlhttp.setRequestHeader('Authorization', 'Client-ID e650e0d2a9e1d2e')
  xmlhttp.send('type=base64&image=' + imageData);

}
