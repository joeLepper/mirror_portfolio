var getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')

module.exports = function colorShift (val) {
  var shift = getRandomInt(5, 50)
  if (coinFlip()) { shift *= -1 }
  return shift + val
}
