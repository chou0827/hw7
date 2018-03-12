var GAMESTATE = 'START'; 
var score = {
  player1: 0,
  player2: 0
}
var ball = {
  x: 0,
  y: 0,
  xvelocity: 2,
  yvelocity: 2,
  size: 0
}
var paddle1 = {
  x: 40,
  y: 200,
  width: 10,
  length: 80
}
var paddle2 = {
  x: 350,
  y: 200,
  width: 10,
  length: 80
}
var gameoS, boop, osc;
var borders = {
  leftx: 50,
  rightx: 350,
  topy: 100,
  bottomy: 350
}
var keypress = {
  w: false, 
  s: false, 
  o: false, 
  l: false, 
  spacebar: false 
}


var pointS;
function preload() {
	 soundFormats('ogg', 'mp3');

  pointS = loadSound('270303__littlerobotsoundfactory__collect-point-01.wav');
  gameoS = loadSound('43696__notchfilter__game-over01.wav');
  boop = loadSound('186669__fordps3__computer-boop.wav');
}


function setup() {
  createCanvas(400, 400);
  

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();
}


function draw() {
  checkInput(); 
  updateState(); 
  drawStuff(); 
}

function checkInput() {
  
  if (keyIsDown(87)) {
    keypress.w = true;
    print('w')
  } else {
    keypress.w = false;
  }
  if (keyIsDown(83)) {
    keypress.s = true;
    print('s')
  } else {
    keypress.s = false;
  }
  if (keyIsDown(79)) {
    keypress.o = true;
    print('o')
  } else {
    keypress.o = false;
  }
  if (keyIsDown(76)) {
    keypress.l = true;
    print('l')
  } else {
    keypress.l = false;
  }
  if (keyIsDown(32)) {
    keypress.spacebar = true;
    print('SPACEBAR')
  } else {
    keypress.spacebar = false;
  }
}

function updateState() {
  if (GAMESTATE == 'START') {
    
    // wait for spacebar
    if (keypress.spacebar == true) {
      GAMESTATE = 'PLAY';
      initializePositions();
    }
  } else if (GAMESTATE == 'POINT') {
    initializePositions();
    if (keypress.spacebar == true) {
      GAMESTATE = 'PLAY';
    }
  } else if (GAMESTATE == 'GAMEOVER') {
    
 
		
    if (keypress.spacebar == true) {
      GAMESTATE = 'START';
    }
  } else if (GAMESTATE == 'PLAY') {
    // move ball 
    ball.x = ball.x + ball.xvelocity;
    ball.y = ball.y + ball.yvelocity;

    if (keypress.w == true) {
      paddle1.y = paddle1.y - 3;
    } else if (keypress.s == true) {
      paddle1.y = paddle1.y + 3;
    }
    if (keypress.o == true) {
      paddle2.y = paddle2.y - 3;
    } else if (keypress.l == true) {
      paddle2.y = paddle2.y + 3;
    }

    if (ball.y < borders.topy) {
      ball.yvelocity = -ball.yvelocity;
      boop.play();
    }
    if (ball.y > borders.bottomy) {
      ball.yvelocity = -ball.yvelocity;
      boop.play();
    }

    if (ball.x > borders.rightx) {
      if ((ball.y > paddle2.y) &&
        (ball.y < (paddle2.y + paddle2.length))) {
          boop.play();
          
          // each time the ball turn smaller when it touches the peddle2
          ball.xvelocity = -ball.xvelocity;
          ball.size = ball.size - 2;
          // each time the boarder turn smaller when it touches the peddle      
          borders.topy = borders.topy + 1.8;
          borders.bottomy = borders.bottomy - 1.8;
          
        
        } else {
          score.player1 = score.player1 + 1;
					pointS.play();
					GAMESTATE = 'POINT';
      }
    }
    if (ball.x < borders.leftx) {
      if ((ball.y > paddle1.y) &&
        (ball.y < (paddle1.y + paddle1.length))) {
          ball.xvelocity = -ball.xvelocity;
          boop.play();
        
          //each time the ball enhance it speed when it touches the peddle1
          ball.xvelocity = ball.xvelocity + 2; 
          ball.yvelocity = ball.yvelocity + 2;
          // each time the boarder turn smaller when it touches the peddle   
          borders.topy = borders.topy + 1.8;
          borders.bottomy = borders.bottomy - 1.8;
        
            
            
        } else {
          score.player2 = score.player2 + 1; 
					pointS.play();
          GAMESTATE = 'POINT';
      }
    }
  }
  if (score.player1 == '5') {
    GAMESTATE = 'GAMEOVER1';
    
  }
  if (score.player2 == '5') {
    GAMESTATE = 'GAMEOVER2';
    
  }
  
}
  
function drawStuff() {
  background(0);
  fill(255)
  
  push();
  fill(255,173,5)
  rect(paddle1.x, paddle1.y, paddle1.width,
    paddle1.length);
  rect(paddle2.x, paddle2.y, paddle2.width,
    paddle2.length);
  pop();
  
  ellipse(ball.x, ball.y, ball.size);
  
  text(score.player1, width / 4, 20);
  text(score.player2, 3 * width / 4, 20);
  
  push();
  noFill();
  strokeWeight(4);
  stroke(255);
  rect(borders.leftx,borders.topy,
       borders.rightx-borders.leftx,
       borders.bottomy - borders.topy);
  pop();
  
  if (GAMESTATE == 'START') {
    
    textAlign(CENTER);
    text('press SPACEBAR to start', width / 2, height / 2);
    
  } else if (GAMESTATE == 'PLAY') {} else if (GAMESTATE == 'POINT') {
    textAlign(CENTER);
    text('press SPACEBAR to continue', width / 2, height / 2);
  } else if (GAMESTATE == 'GAMEOVER1') {
    textAlign(CENTER);
    text('WINNER PLAYER1', width / 2, height / 1.8);
    textAlign(CENTER);
    text('GAMEOVER', width / 2, height / 1.7);
    gameoS.play();
    gameoS = false;
  } else if (GAMESTATE == 'GAMEOVER2') {
    textAlign(CENTER);
    text('WINNER PLAYER2', width / 2, height / 1.8);
    textAlign(CENTER);
    text('GAMEOVER', width / 2, height / 1.7);
    gameoS.play();
    gameoS = false;
}
}


function initializePositions() {
  ball.x = width / 2; 
  ball.y = height / 2;
  ball.xvelocity = random(-2,2); 
  ball.yvelocity = random(-2,2);
  ball.size = 20;
  
  borders.leftx = 50;
  borders.rightx = width - 50;
  borders.topy = 100;
  borders.bottomy = height - 50;

  paddle1.x = borders.leftx - paddle1.width;
  paddle1.y = height / 2;
  paddle2.x = borders.rightx;
  paddle2.y = height / 2;
}

