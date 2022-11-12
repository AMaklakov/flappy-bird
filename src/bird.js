const BIRD_SIZE = 30
const G = 0.2
const JUMP_V = 5

class Bird {
  constructor() {
    this.y = window.HEIGHT / 2
    this.x = window.WIDTH / 4
    this.width = this.height = BIRD_SIZE
    this.halfSize = BIRD_SIZE / 2

    this.v = 0
  }

  draw() {
    image(birdImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  jump() {
    this.v = -JUMP_V
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
  }

  touchesSky = () => this.y - this.halfSize <= 0
  touchesGround = () => this.y + this.halfSize >= window.HEIGHT
}
