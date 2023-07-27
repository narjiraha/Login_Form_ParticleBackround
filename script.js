/* JS */
// define variables
let particles = [];
let particleCount = 800;

// set up canvas
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// draw particles and update their position
function draw() {
  background(0); // set background color
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

// define particle class
class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.size = random(5, 10);
    this.color = color(random(150, 255), random(150, 255), random(150, 255), random(150, 255));
  }

  // update particle position based on velocity and acceleration
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.edges();
    this.interact();
  }

  // draw particle on canvas
  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  // ensure particles stay within canvas bounds
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  // modify particle acceleration based on mouse cursor position
  interact() {
    let distance = dist(this.position.x, this.position.y, mouseX, mouseY);
    if (distance < 100) {
      let force = createVector(mouseX - this.position.x, mouseY - this.position.y);
      force.setMag(1 / distance * 50);
      this.acceleration.add(force);
    } else if (this.velocity.mag() > 0.1) {
      this.velocity.mult(0.95);
    } else {
      this.velocity.mult(0);
    }
  }
}

// resize canvas when window size changes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    for (let i = 0; i < particles.length; i++) {
      particles[i].position = createVector(random(width), random(height));
    }
  }
  