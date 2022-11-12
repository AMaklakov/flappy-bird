window.WIDTH = 288
window.HEIGHT = 512
PIPES_TOTAL = 1

/** @type {Bird} */
let bird
/** @type {Pipe[]} */
let pipes
let score = 0
let record = 0

let needJump = false

function setup() {
  createCanvas(WIDTH, HEIGHT)
  bird = new Bird()
  pipes = [new Pipe()]
}

function preload() {
  loadSprites()
}

function draw() {
  checkJump()

  clear()
  image(bgImg, 0, 0, bgImg.width, height) // set bg image

  pipes.forEach((pipe, index) => {
    pipe.update()
    pipe.draw()

    if (pipe.isPassedOnce(bird)) {
      score += 1
    }
  })
  pipes = pipes.filter((pipe) => !pipe.offscreen())
  pipes = pipes.concat(Array.from({ length: PIPES_TOTAL - pipes.length }).map(() => new Pipe()))

  // jump
  if (needJump) {
    bird.jump()
    needJump = false
  }
  prevTouch = !!touches.length

  bird.update()
  bird.draw()

  showScore()
}

let prevTouch
function checkJump() {
  if (touches.length && !prevTouch) {
    needJump = true
    prevTouch = true
  }
}
function keyPressed() {
  needJump = true
}

function showScore() {
  textSize(20)
  text(`Score: ${score}`, 1, 32)
  text(`Record: ${record}`, 1, 64)
}

//   s.draw = () => {
//     s.background(0)
//     s.image(bgImg, 0, 0, bgImg.width, s.height) // background
//
//
//     // for (let i = pipes.length - 1; i >= 0; i--) {
//     //   pipes[i].update()
//     //   pipes[i].show()
//     //
//     //   if (pipes[i].pass(bird)) {
//     //     score++
//     //   }
//     //
//     //   if (pipes[i].hits(bird)) {
//     //     gameover()
//     //   }
//     //
//     //   if (pipes[i].offscreen()) {
//     //     pipes.splice(i, 1)
//     //   }
//     // }
//     //
//     // bird.update()
//     // bird.show()
//     //
//     // if ((s.frameCount - gameoverFrame) % 150 == 0) {
//     //   pipes.push(new Pipe())
//     // }
//     //
//     // showScores()
//
//     // touched = s.touches.length > 0
//     //
//     // if (touched && !prevTouched) {
//     //   bird.up()
//     // }
//     //
//     // prevTouched = touched
//   }
//
//   //
//   // function gameover() {
//   //   s.textSize(64)
//   //     .textAlign(CENTER, CENTER)
//   //     .text('GAMEOVER', s.width / 2, s.height / 2)
//   //     .textAlign(LEFT, BASELINE)
//   //   maxScore = s.max(score, maxScore)
//   //   isOver = true
//   //   s.noLoop()
//   // }
//   //
//   // function reset() {
//   //   isOver = false
//   //   score = 0
//   //   bgX = 0
//   //   pipes = []
//   //   bird = new Bird()
//   //   pipes.push(new Pipe())
//   //   gameoverFrame = s.frameCount - 1
//   //   s.loop()
//   // }
//   //
//   // const keyPressed = () => {
//   //   if (key === ' ') {
//   //     bird.jump()
//   //     if (isOver) reset()
//   //   }
//   // }
//   //
//   // function touchStarted() {
//   //   if (isOver) reset()
//   // }
//
function loadSprites() {
  window.bgImg = loadImage('./img/bg.png')
  window.birdImg = loadImage('./img/bird.png')
  window.pipeTopImg = loadImage('./img/pipe-top.png')
  window.pipeBottomImg = loadImage('./img/pipe-bottom.png')
}
