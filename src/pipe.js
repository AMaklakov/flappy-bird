export class Pipe {
  constructor(s) {
    this.s = s

    this.spacing = 125
    this.top = this.s.random(this.s.height / 6, (3 / 4) * this.s.height)
    this.bottom = this.top + this.spacing

    this.x = s.width
    this.w = 80
    this.speed = 3

    this.passed = false
    this.highlight = false
  }

  hits(bird) {
    let halfBirdHeight = bird.height / 2
    let halfBirdwidth = bird.width / 2

    if (
      bird.y - halfBirdHeight < this.top ||
      bird.y + halfBirdHeight > this.bottom
    ) {
      //if this.w is huge, then we need different collision model
      if (
        bird.x + halfBirdwidth > this.x &&
        bird.x - halfBirdwidth < this.x + this.w
      ) {
        this.highlight = true
        this.passed = true
        return true
      }
    }
    this.highlight = false
    return false
  }

  //this function is used to calculate scores and checks if we've went through the pipes
  pass(bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true
      return true
    }
    return false
  }

  drawHalf() {
    let howManyNedeed = 0
    let peakRatio = pipeTopImg.height / pipeTopImg.width
    let bodyRatio = pipeBottomImg.height / pipeBottomImg.width

    //this way we calculate, how many tubes we can fit without stretching
    howManyNedeed = Math.round(this.s.height / (this.w * bodyRatio))
    //this <= and start from 1 is just my HACK xD But it's working
    for (let i = 0; i < howManyNedeed; ++i) {
      let offset = this.w * (i * bodyRatio + peakRatio)
      this.s.image(
        pipeBottomImg,
        -this.w / 2,
        offset,
        this.w,
        this.w * bodyRatio
      )
    }
    this.s.image(pipeTopImg, -this.w / 2, 0, this.w, this.w * peakRatio)
  }

  show() {
    this.s.push()
    this.s.translate(this.x + this.w / 2, this.bottom)
    this.drawHalf()
    this.s.translate(0, -this.spacing)
    this.s.rotate(this.s.PI)
    this.drawHalf()
    this.s.pop()
  }

  update() {
    this.x -= this.speed
  }

  offscreen() {
    return this.x < -this.w
  }
}
