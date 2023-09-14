// Global variables for controls, visualisations, sound, and fast fourier transform
var controls = null;
var vis = null;
var sound = null;
var ellipse_n = 0;
var fft;




// My code
// START --------------------------------------------------------------------------------------------

var fourier;

var stars = [];
var planetData = [
  { name: 'Center Planet', x: 0, y: 0, radius: 700, color: 10, distance: 0.02, energy: 'bass' },
  // { name: 'Planet 1', x: 1700, y: 200, radius: 30, color: 10, distance: 0.05, energy: 'bass' },
  // { name: 'Planet 2', x: 100, y: 550, radius: 48, color: 10, distance: 0.2, energy: 'bass' },
  // { name: 'Planet 3', x: 1500, y: 700, radius: 170, color: 10, distance: 0.5, energy: 'bass' },
  // { name: 'Planet 4', x: 200, y: 600, radius: 80, color: 10, distance: 0.4, energy: 'bass' },
  // { name: 'Planet 5', x: 400, y: 100, radius: 90, color: 10, distance: 0.45, energy: 'bass' },
  // { name: 'Planet 6', x: 600, y: 700, radius: 110, color: 10, distance: 0.35, energy: 'bass' },
  // { name: 'Planet 7', x: 1600, y: 200, radius: 60, color: 10, distance: 0.25, energy: 'bass' },
  // { name: 'Planet 8', x: 800, y: 300, radius: 140, color: 10, distance: 0.3, energy: 'bass' },
  // { name: 'Planet 9', x: 900, y: 500, radius: 50, color: 10, distance: 0.15, energy: 'bass' },
  // { name: 'Planet 10', x: 500, y: 800, radius: 100, color: 10, distance: 0.1, energy: 'bass' }
];

function preload() {
  sound = loadSound('assets/KDrew - Bullseye.mp3');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  controls = new ControlsAndInput();
  fourier = new p5.FFT();
  vis = new Visualisations();
  vis.add(new Spectrum());
  vis.add(new WavePattern());
  vis.add(new Needles());
  fft = new p5.FFT(0.8, 256);

}
// END --------------------------------------------------------------------------------------------


function draw() {

// My code
// START --------------------------------------------------------------------------------------------


  // Background setup
  background (10);


  // Analyze the Fourier transform
  let spectrum = fourier.analyze();
  let trebleLevel = fourier.getEnergy('highMid');
  let bassLevel = fourier.getEnergy('bass');
  let lowMidLevel = fourier.getEnergy("lowMid");


  // Map the treble level to a range of 0.5 to 1 for opacity
  let opacity = map(trebleLevel, 0, 255, 0.5, 1);


  // Upper Grid
  stroke(255, 255, 255, bassLevel + 100);
  strokeWeight(bassLevel * 0.01 + 1);
  for (let j = 0; j < 40; j++) {
      arc(
          ((mouseX - (width / 2)) * planetData[0].distance) + width / 2,
          ((mouseY - (height / 2)) * planetData[0].distance) + height / 2 + cos(ellipse_n - j * 0.2) * 120,
          800 + j * 30 ** 1.2,
          200 + j * 35,
          PI,
          TWO_PI
      );
  }


  // Central planet setup and draw
  stroke(10)
  var current_planet = planetData[0];

  let planet = new Planet(
    current_planet.name,
    ((mouseX - (width / 2)) * current_planet.distance) + width / 2,
    ((mouseY - (height / 2)) * current_planet.distance) + height / 2,
    current_planet.radius,
    current_planet.color
  );
  planet.draw();


  // lower Grid
  fill(0,0,0,0)
  stroke(255,255,255,bassLevel+100);
  strokeWeight(bassLevel*0.01+1)
    for(let j = 0; j < 40; j++){
      arc(((mouseX - (width / 2)) * current_planet.distance) + width / 2,
        ((mouseY - (height / 2)) * current_planet.distance) + height / 2 + cos(ellipse_n-j*0.2)*120, 
          800 +j*30**1.2,
          200+j*25,
          0,
          PI);
    }
  ellipse_n+=bassLevel*0.0006
  strokeWeight(1)


  //Glow
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(255);


  // Draw the central sphere grid
  let waveform = fft.waveform();
  noFill();
  stroke(255);  
  strokeWeight(2);
  let numSlices = 10; 
  let horizontalRotation = map(mouseX*0.1 + ellipse_n*50, 0, width, 0, TWO_PI);
  let verticalRotation = map(mouseY*0.1 + ellipse_n*50, 0, height, 0, PI);

  for (let slice = 0; slice < numSlices; slice++) {
    let theta = map(slice, 0, numSlices, 0, PI) + verticalRotation;  // Vertical rotation.
    
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      waveform[i] = waveform[i] * 1
      let angle = map(i, 0, waveform.length, 0, TWO_PI) + horizontalRotation;
      let r = map(waveform[i]+3, -1, 1, 150, 250);
      let yFactor = cos(theta);

      // Transform polar coords to cartesian coords.
      let x = ((mouseX - (width / 2)) * current_planet.distance) + width / 2 + r * cos(angle);
      let y = ((mouseY - (height / 2)) * current_planet.distance) + height / 2 + r * sin(angle) * yFactor;
      vertex(x, y);
    }
    endShape(CLOSE);
  
    theta = map(slice, 0, numSlices, 0, PI) + horizontalRotation;  // Horizontal rotation.
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      waveform[i] = waveform[i] * 1;
      let angle = map(i, 0, waveform.length, 0, TWO_PI) + verticalRotation;
      let r = map(waveform[i]+3, -1, 1, 150, 250);
      let xFactor = sin(theta);

      // Transform polar coords to cartesian coords.
      let x = ((mouseX - (width / 2)) * current_planet.distance) + width / 2 + r * cos(angle) * xFactor;
      let y = ((mouseY - (height / 2)) * current_planet.distance) + height / 2 + r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  // Stop glowing to improve performace
  drawingContext.shadowBlur = 0;


  // If the treble level is above 60, create a new star
  if (trebleLevel > 60) {
    let star = new Star(
      0,
      0,
      random(0.01, 0.03),
      current_planet.radius / 2,
      opacity * 2
    );

    // Add the new star to the stars array
    stars.push(star);
  }

  // Update and draw all stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();

    push(); // Save the current transformation

    // Move to the current planet's position
    translate(
      ((mouseX - (width / 2)) * current_planet.distance) + width / 2,
      ((mouseY - (height / 2)) * current_planet.distance) + height / 2
    );

    // Draw the star
    stars[i].draw();
    pop(); // Restore the transformation
  }

  // Remove stars marked for deletion
  stars = stars.filter(star => !star.toDelete);

// END --------------------------------------------------------------------------------------------





  // Draw the controls on top
  controls.draw();
}

function mouseClicked() {
  controls.mousePressed();
}

function keyPressed() {
  controls.keyPressed(keyCode);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual.hasOwnProperty('onResize')) {
    vis.selectedVisual.onResize();
  }


}
