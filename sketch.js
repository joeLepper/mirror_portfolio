var util = require('util')
  , ee   = require('events').EventEmitter

function getAsync () {
  function buildAsync () {
    var self = this
    setTimeout(function () {
      self.emit('ev')
    }, 1000)
    console.log('init')
  }
  util.inherits(buildAsync, ee)
  return new buildAsync()
}

var async = getAsync()
async.on('ev', function () { console.log('event!') })
