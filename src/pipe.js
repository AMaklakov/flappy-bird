const { WIDTH, HEIGHT } = window

const MIN_H = HEIGHT * (1 / 6)
const MAX_H = HEIGHT * (3 / 4)

const SPACING = 100

class Pipe {
  constructor() {
    this.top = Math.round(Math.random() * (MAX_H - MIN_H) + MIN_H)
    this.bottom = this.top + SPACING

    this.x = WIDTH
    this.w = 80
    this.speed = 3

    this.passed = false
    this.highlight = false
  }

  hits(bird) {
    let halfBirdHeight = bird.height / 2
    let halfBirdwidth = bird.width / 2

    if (bird.y - halfBirdHeight < this.top || bird.y + halfBirdHeight > this.bottom) {
      //if this.w is huge, then we need different collision model
      if (bird.x + halfBirdwidth > this.x && bird.x - halfBirdwidth < this.x + this.w) {
        this.highlight = true
        this.passed = true
        return true
      }
    }
    this.highlight = false
    return false
  }

  isPassedOnce(bird) {
    if (this.passed) return false
    return (this.passed = bird.x > this.x + this.w)
  }

  drawHalf() {
    let howManyNedeed = 0
    let peakRatio = pipeTopImg.height / pipeTopImg.width
    let bodyRatio = pipeBottomImg.height / pipeBottomImg.width

    howManyNedeed = Math.round(HEIGHT / (this.w * bodyRatio))
    for (let i = 0; i < howManyNedeed; ++i) {
      let offset = this.w * (i * bodyRatio + peakRatio)
      image(pipeBottomImg, -this.w / 2, offset, this.w, this.w * bodyRatio)
    }
    image(pipeTopImg, -this.w / 2, 0, this.w, this.w * peakRatio)
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
