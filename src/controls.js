var colors = require('./colors')
  , inputs = document.querySelectorAll('input')

module.exports = function () {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'range')
    bindEvent(inputs[i], i)
  }

  console.log('Hello, World!')
  console.log(inputs)
}

function bindEvent (element, i) {

  element.addEventListener('change', function (e) {
    e.target.nextElementSibling.textContent = e.target.value
    colors.set(e.target.value, i)
  })
}
