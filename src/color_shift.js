var getRandomInt = require('./random_int')
  , coinFlip     = require('./coin_flip')

module.exports = function colorShift (val, _shift) {
  var shift = (typeof _shift === 'object') ? getRandomInt(_shift[0], _shift[1]) : getRandomInt(5, 50)
  if (coinFlip()) { shift *= -1 }
  return shift + val
}
