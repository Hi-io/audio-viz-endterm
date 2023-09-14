class Star {
  constructor(x, y, speed, orbitRadius, opacity) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.orbitRadius = orbitRadius;
    this.angle = random(0, TWO_PI);
    this.opacity = opacity;
    this.orbitX = this.orbitRadius;
    this.orbitY = this.orbitRadius * 0.5;
  }

  update() {
    this.x = this.orbitX * cos(this.angle);
    this.y = this.orbitY * sin(this.angle);
    this.orbitX += 2;
    this.orbitY += 0.5;
    this.angle += this.speed;

    let trebleLevel = fourier.getEnergy('highMid');
    this.opacity = map(trebleLevel, 0, 255, 0, 1);

    if (this.y > -100) {
      this.opacity = 50;
    }

    this.toDelete = this.orbitY > 500;
  }

  draw() {
    fill(10, 10, 10, this.opacity * 255);
    noStroke();
    ellipse(this.x, this.y, 10);
  }
}
