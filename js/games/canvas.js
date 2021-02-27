'use strict';

let cancasClass = document.querySelector('.navigation-class')

let canvas = document.querySelector('canvas');
canvas.width = cancasClass.offsetWidth;
canvas.height = cancasClass.offsetHeight;

let context = canvas.getContext('2d', {
    depth: true
});

// This is a code for multiple balls with cursor movement
const maxRadius = 14;
const minRadius = 2;

let colorArray = [
    '#ffaf87',
    '#fcff4b',
    '#ff8e72',
    '#ffad05',
    '#7cafc4',
];

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('touchmove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

// window.addEventListener('resize', function (e) {

//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;

//     canvas.width = windowWidth;
//     canvas.height = windowHeight;

// });

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // context.strokeStyle = 'green';
        // context.shadowColor = 'rgba(0, 122, 0, 0.5)';
        // context.shadowBlur = 8;

        context.fillStyle = this.color;
        context.stroke();
        context.fill();
    }

    this.update = function () {
        if ((this.x + this.radius > canvas.width) || (this.x - this.radius < 0)) {
            this.dx = -this.dx;
        } 
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

for (let index = 0; index < 400; index++) {

    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 4;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dy = (Math.random() - 0.5) * 4;

    circleArray.push(new Circle(x, y, dx, dy, radius));    
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
}

animate();


// Testing

//drawImage()

// //rectangle 
// context.fillStyle = 'rgba(255, 0, 0, 0.4)';
// context.fillRect(400, 400, 250, 250)

// context.fillStyle = 'rgba(0, 255, 0, 0.4)';
// context.fillRect(0, 0, 250, 250)

// context.fillStyle = 'rgba(0, 0, 255, 0.4)';
// context.fillRect(800, 0, 250, 250)

// // line
// context.beginPath();
// context.moveTo(200, 500);
// context.strokeStyle = "#0000ff";
// context.lineTo(500, 200);
// context.strokeStyle = "#00ff00";    //this is taken
// context.lineTo(34, 197);
// context.stroke();