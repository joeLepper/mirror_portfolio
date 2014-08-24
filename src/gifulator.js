module.exports = function dynamicSelfie (video, canvas, mirror) {
  var encoder = new GIFEncoder()
    , ctx     = canvas.getContext('2d')
    , frame   = 0
    , clock
    , videoWidth  = video.videoWidth
    , videoHeight = video.videoHeight
    , totalFrames = 40
    , binaryGif

  canvas.height = 150
  canvas.width  = 300

  encoder.setRepeat(0)
  encoder.setDelay(100)
  encoder.start()

  clock = setInterval(function () {
    console.log('shutter')

    if (frame >= totalFrames) {
      encoder.finish()
      binaryGif = encoder.stream().getData()
      uploadSelfie(encode64(binaryGif))
      clearInterval(clock)
    }
    else {
      ctx.drawImage(mirror, 0, 0, videoWidth, videoHeight, 0, 0, videoWidth, videoHeight)
      encoder.addFrame(ctx)
      frame++
    }
  }, 100)
}

function uploadSelfie (imageData) {
  console.log('initiating upload')
  $.ajax({
    url  : 'https://api.imgur.com/3/upload',
    type : 'POST',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Client-ID e650e0d2a9e1d2e');
    },
    data: {
      type  : 'base64',
      image : imageData
    },
    dataType : 'json',
    success  : function (res) {
      console.log('successful upload')
      console.log('initiating email')
      console.log(res.data.link)
      $.post('/email', { email : $('.email').val(), link : res.data.link})
    },
    error    : function (err) { console.error(err) }
  });

}

function showGif (imageData) {
  var dataUrl = 'data:image/gif;base64,'+ imageData
    , img     = document.querySelector('.gif-holder')

  img.src = dataUrl
}
