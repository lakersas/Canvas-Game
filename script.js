const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let enemyPosition = 0;

// Class for every object in the game
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

class enemyAsteroid {
    constructor(size, speed) {
        this.size = size;
        this.speed = speed;
        this.x = 0;
        this.y = 0;
        this.friendly = false;
    }

    update(deltaTime) {
        this.x += deltaTime * this.speed;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// In game objects , enemy and player
const gameData = {
    points: 0,
    asteroids: [],
    previousFrameTime: 0,
    player: new Player(),
    gameStart: false,
    enemy: new enemyAsteroid()
};

// Display In Game
function frame() {
    updateGameData();
    clearFrame();
    drawFrame();

    window.requestAnimationFrame(frame);
}

// ClearFrame - clears old frames so they don't stack in game
function clearFrame() {
    ctx.clearRect(0, 0, 800, 600);
}

// A frame refers to the image we see on the screen, which gets updated a certain number of times a second. The frequency in which the frame is updated is known as frame rate, usually measured in frames per second (fps).
function updateGameData() {
    const currentTime = Date.now();
    let deltaTime = (currentTime - gameData.previousFrameTime) / 1000;

    if (!gameData.previousFrameTime)
        deltaTime = 0;

    for (let asteroid of gameData.asteroids) {
        asteroid.update(deltaTime);
    }

    enemyPosition++;

    gameData.previousFrameTime = currentTime;
}

// Draws whats in game
function drawFrame() {
    if (gameData.gameStart === false) {
        ctx.font = "36px Apple Chancery, cursive";
        ctx.textAlign = "center";
        ctx.fillText("Click to Start Game", 400, 300);
    }

    if (gameData.gameStart === true)
        gameData.player.draw();

    // just to see if objects appear , need to make them in game.
    ctx.fillRect(enemyPosition, 200, 100, 100);
    ctx.fillRect(50, enemyPosition, 100, 100);
    ctx.fillRect(200, enemyPosition, 100, 100);
    ctx.fillRect(enemyPosition, 30, 100, 100);

}

// Object parameters
function initGame() {
    document.addEventListener("click", startGame, true);
    document.addEventListener("mousemove", mouseMovementHandler);
    frame();
}

// Game start on click and object appearance on same spot there was the mouse
function startGame(e) {
    gameData.gameStart = true;

    const mousePosition = getMousePosition(e)
    gameData.player.setPosition(mousePosition.x, mousePosition.y);

}

// Mouse movement function
function mouseMovementHandler(e) {
    const mousePosition = getMousePosition(e);

    // Player mouse position
    gameData.player.setPosition(mousePosition.x, mousePosition.y);
}

// Object will be indicated where is players mouse
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