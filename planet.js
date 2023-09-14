class Planet {
  constructor(name, x, y, radius, color) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  // Method to draw the planet
  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius);
  }
}
