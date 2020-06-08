import compile from "../parser/parser"

export default class Plot {
  constructor(canvasEl) {
    this.canvasEl = canvasEl
    this.ctx = canvasEl.getContext("2d")
    this.dpr = window.devicePixelRatio
    this.axisColor = "#000000"
    this.gridColor = "#e9e9e9"
    this.lineWidth = 1

    this.resize()
    this.init()
  }

  init() {
    window.addEventListener("resize", this.resize.bind(this))
    this.draw()
  }

  destroy() {
    window.removeEventListener("resize", this.resize)
  }

  resize() {
    this.canvasEl.width = Math.ceil(this.canvasEl.offsetWidth * this.dpr)
    this.canvasEl.height = Math.ceil(this.canvasEl.offsetHeight * this.dpr)

    this.draw()
  }

  setData(startX, endX, validExpr) {
    console.log("Plot: set data", startX, endX, validExpr)
    const funcY = compile(validExpr)

    if (endX <= startX) {
      console.warn("Plot: invalid range", startX, endX)
      return
    }

    const POINTS_COUNT = 200
    const xTick = (endX - startX) / POINTS_COUNT

    const yValues = new Float32Array(POINTS_COUNT + 1)
    const xValues = new Float32Array(POINTS_COUNT + 1)

    let minY = Infinity
    let maxY = -Infinity
    for (let i = 0; i <= POINTS_COUNT; i++) {
      let x = startX + xTick * i
      let y = funcY(x)
      if (y === Infinity) y = 0

      if (y < minY) minY = y
      if (y > maxY) maxY = y

      xValues[i] = x
      yValues[i] = y
    }

    // fix constant y
    if (minY === maxY) {
      minY -= minY
      maxY += maxY
    }

    this.minX = startX
    this.maxX = endX
    this.minY = minY
    this.maxY = maxY
    this.xValues = xValues
    this.yValues = yValues
    this.caption = "y = " + validExpr

    this.draw()
  }

  draw() {
    const ctx = this.ctx
    const minX = this.minX
    const maxX = this.maxX
    const minY = this.minY
    const maxY = this.maxY
    const offsetX = 5
    const offsetY = 15
    const xGridNumber = 10
    const yGridNumber = 10
    const canvasWidth = this.canvasEl.width
    const canvasHeight = this.canvasEl.height

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // calculate X
    const scaleX = (canvasWidth - 2 * offsetX) / (maxX - minX)

    function toCanvasX(x) {
      return Math.abs(x - minX) * scaleX + offsetX
    }

    let xLines = (maxX / (maxX - minX)) * xGridNumber
    let xTick = maxX / xLines

    // calculate X
    const scaleY = (canvasHeight - 2 * offsetY) / (maxY - minY)

    function toCanvasY(y) {
      return Math.abs(maxY - y) * scaleY + offsetY
    }

    let yLines = (maxY / (maxY - minY)) * yGridNumber
    let yTick = maxY / yLines

    // draw positive Y grid and ticks
    for (let i = 1; i <= xLines; i++) {
      drawYLine(this.gridColor, toCanvasX(0 + i * xTick))
    }

    // draw negative Y grid
    for (let i = 1; i <= 10 - xLines; i++) {
      drawYLine(this.gridColor, toCanvasX(0 - i * xTick))
    }

    // draw positive X grid
    for (let i = 1; i <= yLines; i++) {
      drawXLine(this.gridColor, toCanvasY(0 + i * yTick))
    }

    // draw negative X grid
    for (let i = 1; i <= 10 - yLines; i++) {
      drawXLine(this.gridColor, toCanvasY(0 - i * yTick))
    }

    const zeroX = toCanvasX(0)
    const zeroY = toCanvasY(0)

    //draw axis
    drawYLine(this.axisColor, zeroX)
    drawXLine(this.axisColor, zeroY)

    // draw positive X ticks
    for (let i = 1; i <= xLines; i++) {
      let x = toCanvasX(0 + i * xTick) + 0.5
      drawLine(this.axisColor, 1, x, zeroY - 3, x, zeroY + 3)
      drawLabel(round(i * xTick), x, zeroY + 15, "end")
    }

    // draw negative X ticks
    for (let i = 1; i <= 10 - xLines; i++) {
      let x = toCanvasX(0 - i * xTick) + 0.5
      drawLine(this.axisColor, 1, x, zeroY - 3, x, zeroY + 3)
      drawLabel(round(-(i * xTick)), x, zeroY + 15, "start")
    }

    // draw positive Y ticks
    for (let i = 1; i <= yLines; i++) {
      let y = toCanvasY(0 + i * yTick) + 0.5
      drawLine(this.axisColor, 1, zeroX - 3, y, zeroX + 3, y)
      drawLabel(round(i * yTick), zeroX + 15, y + 3)
    }

    // draw negative Y ticks
    for (let i = 1; i <= 10 - yLines; i++) {
      let y = toCanvasY(0 - i * yTick) + 0.5
      drawLine(this.axisColor, 1, zeroX - 3, y, zeroX + 3, y)
      drawLabel(round(-i * yTick), zeroX + 15, y + 3)
    }

    // draw function
    if (this.xValues && this.xValues.length) {
      ctx.lineWidth = 1
      ctx.strokeStyle = "#f14668"
      ctx.beginPath()
      ctx.moveTo(toCanvasX(this.xValues[0]), toCanvasY(this.yValues[0]))

      for (let i = 1, len = this.xValues.length; i < len; i++) {
        ctx.lineTo(toCanvasX(this.xValues[i]), toCanvasY(this.yValues[i]))
      }
      ctx.stroke()
    }

    // draw caption
    if (this.caption) {
      if (maxX >= Math.abs(minX) && maxY >= Math.abs(minY)) {
        // at top right corner
        drawLabel(this.caption, canvasWidth - 10, 10, "end")
      } else if (maxX >= Math.abs(minX) && maxY < Math.abs(minY)) {
        // at bottom right corner
        drawLabel(this.caption, canvasWidth - 10, canvasHeight - 10, "end")
      } if (maxX < Math.abs(minX) && maxY >= Math.abs(minY)) {
        // at top left corner
        drawLabel(this.caption, 10, 10, "start")
      } if (maxX < Math.abs(minX) && maxY < Math.abs(minY)) {
        // at bottom left corner
        drawLabel(this.caption, 10, canvasHeight - 10, "start")
      }
    }

    function drawLine(color, lineWidth, fromX, fromY, toX, toY) {
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.moveTo(fromX, fromY)
      ctx.lineTo(toX, toY)
      ctx.stroke()
    }

    function drawXLine(color, Y) {
      drawLine(color, 1, 0, Y + 0.5, canvasWidth, Y)
    }

    function drawYLine(color, X) {
      drawLine(color, 1, X + 0.5, 0, X + 0.5, canvasHeight)
    }

    function drawLabel(text, x, y, textAlign) {
      ctx.font = "9px Arial"
      ctx.textAlign = textAlign || "center"
      ctx.fillText(text, x, y)
    }

    function round(num) {
      return Math.round(num * 1000) / 1000
    }
  }
}
