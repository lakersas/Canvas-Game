const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
    }

    setPosition(x, y) {
        this.x = x - (this.width / 2);
        this.y = y - (this.height / 2);
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

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
    previousFrameTime: 0,
    player: new Player(),
    gameStart: false
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
    if (gameData.gameStart === false) {
        ctx.font = "36px Apple Chancery, cursive";
        ctx.textAlign = "center";
        ctx.fillText("Click to Start Game", 400, 300);
    }

    if (gameData.gameStart === true)
        gameData.player.draw();
}

// Object parameters
function initGame() {
    document.addEventListener("click", startGame, true);
    document.addEventListener("mousemove", mouseMovementHandler);
    gameData.asteroids.push(new Asteroid(50, 120));

    frame();
}

function startGame(e) {
    gameData.gameStart = true;

    const mousePosition = getMousePosition(e)
    gameData.player.setPosition(mousePosition.x, mousePosition.y);
}

//Mouse movement fuction
function mouseMovementHandler(e) {
    const mousePosition = getMousePosition(e);

    // Player mouse position
    gameData.player.setPosition(mousePosition.x, mousePosition.y);
}

function getMousePosition(event) {
    let relativeX = event.clientX - ctx.canvas.getBoundingClientRect().left;
    let relativeY = event.clientY - ctx.canvas.getBoundingClientRect().top;

    return {
        x: relativeX,
        y: relativeY
    }
}

// Game Start
initGame();