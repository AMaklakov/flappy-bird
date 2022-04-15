export class Bird {
  constructor(s) {
    this.s = s

    this.y = s.height / 2
    this.x = 64

    this.gravity = 0.6
    this.lift = -10
    this.velocity = 0

    this.width = 64
    this.height = 64
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    this.s.image(
      birdImg,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    )
  }

  up() {
    this.velocity = this.lift
  }

  update() {
    this.velocity += this.gravity
    this.y += this.velocity

    if (this.y >= this.s.height - this.height / 2) {
      this.y = this.s.sheight - this.height / 2
      this.velocity = 0
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2
      this.velocity = 0
    }
  }
}
