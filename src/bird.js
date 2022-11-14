const BIRD_SIZE = 30
const G = 0.25
const JUMP_A = 5
const MIN_V = -8

class Bird {
  constructor() {
    this.y = HEIGHT / 2
    this.x = WIDTH / 4
    this.width = this.height = BIRD_SIZE
    this.halfSize = BIRD_SIZE / 2

    this.v = 0
  }

  draw() {
    image(birdImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    return this
  }

  jump() {
    if (this.v < 0) {
      this.v -= JUMP_A / 1.4
    } else {
      this.v = -JUMP_A
    }
    this.v = Math.max(MIN_V, this.v)
    return this
  }

  update() {
    this.v += G
    this.y += this.v

    if (this.y >= height - this.halfSize) {
      this.y = HEIGHT - this.halfSize
      this.v = 0
    }

    if (this.y <= this.halfSize) {
      this.y = this.halfSize
      this.v = 0
    }

    return this
  }

  touchesSky = () => this.y - this.halfSize <= 0
  touchesGround = () => this.y + this.halfSize >= HEIGHT
}
