const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



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
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height - 30, 30, 0, Math.PI * 2);
        ctx.fillStyle = "#7FFFD4";
        ctx.fill();
        ctx.closePath();
    }
}

class enemyAsteroid {
    constructor(enemyRadius, x, y, dx, dy) {
        this.x = Math.random() * (canvas.width - (canvas.width - canvas.width)) + (canvas.width - canvas.width);
        this.y = Math.random() * (canvas.height - (canvas.height - canvas.height)) + (canvas.height - canvas.height);
        this.enemyRadius = enemyRadius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    update(deltaTime) {
        this.x += deltaTime * this.speed;
    }

    drawEnemy() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height - 20, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    enemyMovementAsteroid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEnemy();

        if (x + dx > canvas.width - enemyRadius || x + dx < enemyRadius) {
            dx = -dx;
        }
        if (y + dy > canvas.height - enemyRadius || y + dy < enemyRadius) {
            dy = -dy;
        }

        x += dx;
        y += dy;
    }

}


// In game objects , enemy and player
const gameData = {
    points: 0,
    asteroids: [],
    previousFrameTime: 0,
    player: new Player(),
    gameStart: false,
    enemy: new enemyAsteroid(),
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
        gameData.enemy.enemyMovementAsteroid();

    if (gameData.gameStart === true)
        gameData.player.draw();


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

//Enemy Functions
let enemyRadius = 20;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let raf;

function drawEnemy() {
    ctx.beginPath();
    ctx.arc(x, y, enemyRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function enemyMovementAsteroid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEnemy();

    if (x + dx > canvas.width - enemyRadius || x + dx < enemyRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - enemyRadius || y + dy < enemyRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

// More asteroids

let moreAsteroids = [];
for (let i = 0; i < 5; i++) {
    moreAsteroids[i] = new enemyAsteroid();
}

function asteroidAmount() {
    moreAsteroids[0].ctx.clearRect(0, 0, canvas.width, canvas.height);
    moreAsteroids.forEach(function(b) {
        b.drawEnemy(b);
        b.enemyMovementAsteroid(b);
    });

    raf = window.requestAnimationFrame(asteroidAmount);
}

canvas.addEventListener('click', function(b) {
    raf = window.requestAnimationFrame(asteroidAmount);
});

// Game Start
initGame();
setInterval(enemyMovementAsteroid, 5);