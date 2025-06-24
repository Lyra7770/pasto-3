let cesped = [];
let separacion = 10;
let interactX = -1000;
let interactY = -1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(displayDensity());
  crearCesped();
  noCursor();
}

function draw() {
  dibujarFondo();
  for (let b of cesped) {
    b.mover(interactX, interactY);
    b.dibujar();
  }
  interactX = lerp(interactX, -1000, 0.03);
  interactY = lerp(interactY, -1000, 0.03);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  crearCesped();
}

function crearCesped() {
  cesped = [];
  let inicioPasto = height * 0.6;
  for (let x = 0; x < width; x += separacion) {
    for (let y = inicioPasto; y < height; y += separacion) {
      cesped.push(new Brizna(x, y));
    }
  }
}

function dibujarFondo() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(204, 235, 249), color(133, 201, 232), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

function mousePressed() {
  interactX = mouseX;
  interactY = mouseY;
}
function mouseMoved() {
  interactX = mouseX;
  interactY = mouseY;
}
function mouseDragged() {
  interactX = mouseX;
  interactY = mouseY;
}
function touchStarted() {
  if (touches.length > 0) {
    interactX = touches[0].x;
    interactY = touches[0].y;
  }
  return false;
}
function touchMoved() {
  if (touches.length > 0) {
    interactX = touches[0].x;
    interactY = touches[0].y;
  }
  return false;
}

class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(140, 220);
    this.angulo = random(TWO_PI);
    this.oscilacion = random(0.003, 0.006);
    this.grosor = random(1.3, 2.2);
    this.color = color(random(70, 110), random(140, 180), random(90, 120), 220);
    this.inclinacion = 0;
  }

  mover(mx, my) {
    this.angulo += this.oscilacion;
    let brisa = sin(this.angulo) * 1.5;
    let d = dist(this.x, this.y, mx, my);
    let efecto = (d < 150) ? map(d, 0, 150, 20, 0) : 0;
    this.inclinacion = brisa + efecto;
  }

  dibujar() {
    stroke(this.color);
    strokeWeight(this.grosor);
    noFill();
    let x1 = this.x;
    let y1 = this.y;
    let x2 = x1 + this.inclinacion * 0.3;
    let y2 = y1 - this.altura * 0.3;
    let x3 = x1 + this.inclinacion * 0.7;
    let y3 = y1 - this.altura * 0.7;
    let x4 = x1 + this.inclinacion;
    let y4 = y1 - this.altura;
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}
