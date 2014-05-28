var colors = [5, 5, 5]

exports.set = function (val, i) {
  colors[i] = val
}

exports.get = function (i) {
  return colors[i]
}