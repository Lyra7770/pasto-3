let cesped = [];
let separacion = 10;
let interactX = -1000;
let interactY = -1000;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(displayDensity());
  crearCesped();
}

function draw() {
  dibujarFondo();

  for (let b of cesped) {
    b.mover(interactX, interactY);
    b.dibujar();
  }

  // Hacer que el efecto de interacción desaparezca suavemente
  interactX = lerp(interactX, -1000, 0.03);
  interactY = lerp(interactY, -1000, 0.03);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  crearCesped();
}

function crearCesped() {
  cesped = [];
  let inicioPasto = 400; // desde más arriba hacia abajo
  for (let x = 0; x < width; x += separacion) {
    for (let y = height - inicioPasto; y < height; y += separacion) {
      cesped.push(new Brizna(x, y));
    }
  }
}

function dibujarFondo() {
  noFill();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(163, 216, 244), color(120, 190, 230), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

// Interacción con mouse o dedo
function mouseMoved() {
  interactX = mouseX;
  interactY = mouseY;
}

function mouseDragged() {
  interactX = mouseX;
  interactY = mouseY;
}

function mousePressed() {
  interactX = mouseX;
  interactY = mouseY;
}

function touchMoved() {
  if (touches.length > 0) {
    interactX = touches[0].x;
    interactY = touches[0].y;
  }
  return false;
}

function touchStarted() {
  if (touches.length > 0) {
    interactX = touches[0].x;
    interactY = touches[0].y;
  }
  return false;
}

// Clase del pasto
class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(220, 340); // pasto muy largo
    this.angulo = random(TWO_PI);
    this.oscilacion = random(0.004, 0.008); // suave brisa
    this.grosor = random(1.3, 2.2);
    let tonoVerde = random(100, 170);
    this.color = color(50, tonoVerde, 70, 230);
    this.inclinacion = 0;
  }

  mover(mx, my) {
    this.angulo += this.oscilacion;
    let brisa = sin(this.angulo) * 2;

    let d = dist(this.x, this.y, mx, my);
    let efecto = (d < 180) ? map(d, 0, 180, 30, 0) : 0;

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
