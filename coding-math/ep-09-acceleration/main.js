/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { makeParticle } from '../common/makeParticle.js'
import { makeVector } from '../common/makeVector.js'
import { makeRepeater } from '../common/makeRepeater.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

const p1 = makeParticle({
  x: 200,
  y: 700,
  speed: 10,
  direction: -Math.PI / 2
})

const accel = makeVector({
  x: 0.1,
  y: 0.1
})

const particles = []

const particleCount = 100

const buildParticles = makeRepeater(() => {
  const x = 500
  const y = 300
  const speed = 10 * Math.random() + 2
  const direction = -Math.PI * 2 * Math.random()
  const gravity = 0.1
  particles.push(makeParticle({
    x,
    y,
    speed,
    direction,
    gravity
  }))
})

buildParticles(particleCount)

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas
  particles.forEach(particle => {
    particle.update()
    context.beginPath()
    context.arc(particle.position.x, particle.position.y, 4, 0, Math.PI * 2, false)
    context.fill()
  })
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
