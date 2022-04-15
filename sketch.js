import { Pipe } from './src/pipe.js'
import { Bird } from './src/bird.js'

new p5((s) => {
  // let birdImg, pipeBottomImg, pipeTopImg, bgImg
  let bird,
    pipes,
    score = 0
  var maxScore = 0
  var gameoverFrame = 0
  var isOver = false

  var touched = false
  var prevTouched = touched

  s.preload = () => {
    window.bgImg = s.loadImage('./img/bg.png')
    window.birdImg = s.loadImage('./img/bird.png')
    window.pipeTopImg = s.loadImage('./img/pipe-top.png')
    window.pipeBottomImg = s.loadImage('./img/pipe-bottom.png')
  }

  s.setup = () => {
    s.createCanvas(800, 600)
    bird = new Bird(s)
    pipes = [new Pipe(s)]
  }

  s.draw = () => {
    s.background(0)

    // draw background
    s.image(bgImg, 0, 0, bgImg.width, s.height)

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update()
      pipes[i].show()

      if (pipes[i].pass(bird)) {
        score++
      }

      if (pipes[i].hits(bird)) {
        gameover()
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1)
      }
    }

    bird.update()
    bird.show()

    if ((s.frameCount - gameoverFrame) % 150 == 0) {
      pipes.push(new Pipe())
    }

    showScores()

    // touches is an list that contains the positions of all
    // current touch points positions and IDs
    // here we check if touches' length is bigger than one
    // and set it to the touched var
    touched = s.touches.length > 0

    // if user has touched then make bird jump
    // also checks if not touched before
    if (touched && !prevTouched) {
      bird.up()
    }

    // updates prevTouched
    prevTouched = touched
  }

  function showScores() {
    s.textSize(32)
    s.text('score: ' + score, 1, 32)
    s.text('record: ' + maxScore, 1, 64)
  }

  function gameover() {
    s.textSize(64)
      .textAlign(CENTER, CENTER)
      .text('GAMEOVER', s.width / 2, s.height / 2)
      .textAlign(LEFT, BASELINE)
    maxScore = s.max(score, maxScore)
    isOver = true
    s.noLoop()
  }

  function reset() {
    isOver = false
    score = 0
    bgX = 0
    pipes = []
    bird = new Bird()
    pipes.push(new Pipe())
    gameoverFrame = s.frameCount - 1
    s.loop()
  }

  function keyPressed() {
    if (key === ' ') {
      bird.up()
      if (isOver) reset() //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
    }
  }

  function touchStarted() {
    if (isOver) reset()
  }
})
