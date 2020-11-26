const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Asteroid {
    constructor(size, speed) {
        this.size = size;
        this.x = 0;
        this.y = 0;
        this.friendly = true;
        this.speed = speed;
    }

    update(deltaTime) {
        this.x += deltaTime * this.speed;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

const gameData = {
    points: 0,
    asteroids: [],
    previousFrameTime: 0
};

function frame() {
    updateGameData();
    clearFrame();
    drawFrame();

    window.requestAnimationFrame(frame);
}

function clearFrame() {
    ctx.clearRect(0, 0, 800, 600);
}

function updateGameData() {
    const currentTime = Date.now();
    let deltaTime = (currentTime - gameData.previousFrameTime) / 1000;

    if (!gameData.previousFrameTime)
        deltaTime = 0;

    for (let asteroid of gameData.asteroids) {
        asteroid.update(deltaTime);
    }

    gameData.previousFrameTime = currentTime;
}

function drawFrame() {
    for (let asteroid of gameData.asteroids) {
        asteroid.draw();
    }
}

// Object parameters
function startGame() {
    gameData.asteroids.push(new Asteroid(50, 120));

    frame();
}

// Game Start
startGame();