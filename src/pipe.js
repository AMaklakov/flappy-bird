const MIN_H = HEIGHT * (1 / 6)
const MAX_H = HEIGHT * (3 / 4)

const PIPE_V = 3
const PIPE_W = 75
const SPACING = 100

let PEAK_RATIO
let BOTTOM_RATIO

class Pipe {
  constructor() {
    this.top = Math.round(Math.random() * (MAX_H - MIN_H) + MIN_H)
    this.bottom = this.top + SPACING

    this.x = WIDTH
    this.w = PIPE_W
    this.speed = PIPE_V

    PEAK_RATIO = pipeTopImg.height / pipeTopImg.width
    BOTTOM_RATIO = pipeBottomImg.height / pipeBottomImg.width
    this.passed = false
  }

  /** @param {Bird} bird */
  hits(bird) {
    if (this.passed || bird.x + bird.halfSize < this.x) return false
    return bird.y - bird.halfSize < this.top || bird.y + bird.halfSize > this.bottom
  }

  isPassedOnce(bird) {
    if (this.passed) return false
    return (this.passed = bird.x - bird.halfSize > this.x + this.w)
  }

  drawHalf() {
    const bImgCount = Math.round(HEIGHT / (this.w * BOTTOM_RATIO))
    for (let i = 0; i < bImgCount; ++i) {
      let offset = this.w * (i * BOTTOM_RATIO + PEAK_RATIO)
      image(pipeBottomImg, -this.w / 2, offset, this.w, this.w * BOTTOM_RATIO)
    }
    image(pipeTopImg, -this.w / 2, 0, this.w, this.w * PEAK_RATIO)
  }

  draw() {
    push()
    translate(this.x + this.w / 2, this.bottom)
    this.drawHalf()
    translate(0, -SPACING)
    rotate(PI)
    this.drawHalf()
    pop()
  }

  update() {
    this.x -= this.speed
    return this
  }

  offscreen = () => this.x < -this.w
}
