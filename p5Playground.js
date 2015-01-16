var system;

function setup() {
    "use strict";
    createCanvas(720, 400);
    system = new ParticleSystem(createVector(width / 2, 50));   // Assign variable system to an instance of ParticleSystem centered at the middle of the page width, as determined by the p5 library.
}

function draw() {
    "use strict";
    background(51);
    system.addParticle();   // use of addParticle method of a ParticleSystem, which, as defined below, adds an instance of Particle at the ParticleSystem's origin to a ParticleSystem's array of Particles
    system.run();   //use of ParticleSystem run method, which eliminates dead particles from Particle list.
}

// A simple Particle class: Randomly defines the acceleration and velocity properties of each individual object that falls from the top of the screen, provided a position.
var Particle = function (position) {
    "use strict";
    this.acceleration = createVector(0, 0.05); // Acceleration property is used to calculate velocity in Particle object's update function
    this.velocity = createVector(random(-1, 1), random(-1, 0)); // velocity property used to calculate position
    this.position = position.get();
    this.lifespan = 255.0;
};

// All methods are established under prototype objects, so that they don't have to be stored under each instance of an class.
Particle.prototype.run = function () {
    "use strict";
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function () {
    "use strict";
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function () {
    "use strict";
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
    "use strict";
    if (this.lifespan < 0) {
        return true;
    } else {
        return false;
    }
};

// Environmental object in which all Particles interact and exist; array containing all properties
var ParticleSystem = function (position) {
    "use strict";
    this.origin = position.get();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
    "use strict";
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
    "use strict";
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    } 
};