const container = document.querySelector('#container')
const reset = document.querySelector('#reset')
let squares = []
let rainbow = document.querySelector('#rainbow')
let lastColour = randomColour()

function color (event) {
  if (event.target !== container) {
    if (event.target.classList.contains('filled')) {
      const colour = event.target.style.backgroundColor
      event.target.style.backgroundColor = darkenColour(colour)
    } else {
      lastColour[0] += 10
      event.target.style.backgroundColor = toHSL(lastColour)
      event.target.classList.add('filled')
    }

  }
}

function randomColour () {
  let hue = Math.floor(Math.random() * 360)
  if (rainbow.checked) return [hue, 80, 70]
  else return [hue, 0, 20]
  
}

function toHSL (array) {
  return `hsl(${array[0]} ${array[1]}% ${array[2]}%)`
}

function rgbToArray (rgb) {
  return rgb.split(',')
    .map(value => {
      return +value.replace(/[^0-9]/g, '')
    })
}


function darkenColour (color) {
  let rgb = rgbToArray(color).map(value => {
    return value - 30 > 0 ? value - 30 : 0
  })
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`
}


function resetGrid (event) {
  if (event) {
    event.target.blur()
  }

  squares.forEach(square => {
    container.removeChild(square)
  })

  let gridSize = document.querySelector('#size').value

  squares = []
  for (let i = 0; i < gridSize ** 2; i++) {
    squares.push(document.createElement('div'))
  }

  squares.forEach(square => {
    container.appendChild(square)
    square.className = 'empty'
    square.style.width = 100 / gridSize + '%'
    square.style.height = 100 / gridSize + '%'
  })

  lastColour = randomColour()
}

resetGrid()

container.addEventListener('mouseover', color)

reset.addEventListener('click', resetGrid)

rainbow.addEventListener('click', resetGrid)
