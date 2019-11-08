/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

let xAngle = 0
let yAngle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  // clearCanvas({ context })
  const { width, height } = canvas

  const centerX = width * 0.5
  const centerY = height * 0.5

  const xRadius = 500
  const yRadius = 300
  const xSpeed = 0.002
  const ySpeed = 0.00533333

  // for (let angle = 0; angle < Math.PI * 2; angle += 0.03) {
  const x = centerX + Math.cos(xAngle) * xRadius
  const y = centerY + Math.sin(yAngle) * yRadius
  context.beginPath()
  context.fillStyle = `hsla(${yAngle}rad, 50%, 50%, 1)`
  context.arc(x, y, 20, 0, Math.PI * 2, false)
  context.fill()
  // }

  // const x = centerX + Math.cos(xAngle) * xRadius
  // const y = centerY + Math.sin(yAngle) * yRadius

  // context.beginPath()
  // context.arc(x, y, 10, 0, Math.PI * 2, false)
  // context.fill()

  xAngle += xSpeed
  yAngle += ySpeed
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
