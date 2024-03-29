const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const PIPES_TOTAL = 1
const NEW_PIPE_FRAMES = 150

/** @type {Bird} */
let bird
/** @type {Pipe[]} */
let pipes
let score = 0
let record = +localStorage.getItem('record') || 0

let needJump = false
let isGameOver = false
let gameOverFrame = 0
let prevTouch

function setup() {
  createCanvas(WIDTH, HEIGHT)
  bird = new Bird()
  pipes = [new Pipe()]
}

function preload() {
  loadSprites()
}

function draw() {
  image(bgImg, 0, 0, WIDTH, HEIGHT)

  if (checkGameOver()) {
    gameover()
  }

  pipes.forEach((pipe) => pipe.update().draw())
  score += pipes.filter((p) => p.isPassedOnce(bird)).length
  if ((frameCount - gameOverFrame) % NEW_PIPE_FRAMES === 0) {
    pipes.push(new Pipe())
  }

  checkJump()
  prevTouch = !!touches.length
  if (needJump) {
    bird.jump()
    needJump = false
  }
  bird.update().draw()

  showScore()
}

// support touch devices
function checkJump() {
  if (touches.length && !prevTouch) {
    needJump = true
    prevTouch = true
  }
}
// support keyboard
function keyPressed() {
  needJump = true
}

function showScore() {
  textSize(20)
  text(`Score: ${score}`, 1, 32)
  text(`Record: ${record}`, 1, 64)
}

function checkGameOver() {
  const isHit = pipes.some((p) => p.hits(bird))
  return isHit || bird.touchesSky() || bird.touchesGround()
}

function gameover() {
  record = Math.max(score, record)
  localStorage.setItem('record', record)
  toggleGameOver(true)
  gameOverFrame = frameCount
  noLoop()
}

function restart() {
  isGameOver = false
  score = 0
  pipes = [new Pipe()]
  bird = new Bird()
  gameoverFrame = frameCount - 1
  toggleGameOver(false)
  loop()
}

function toggleGameOver(show) {
  const div = document.querySelector('#gameOver')
  div.style.display = show ? 'flex' : 'none'
  div.querySelector('.result').innerHTML = score
}

function loadSprites() {
  window.bgImg = loadImage('./img/bg.png')
  window.birdImg = loadImage('./img/bird.png')
  window.pipeTopImg = loadImage('./img/pipe-top.png')
  window.pipeBottomImg = loadImage('./img/pipe-bottom.png')
}
