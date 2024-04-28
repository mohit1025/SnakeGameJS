let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('../Music/8-bit-game-music-122259.mp3');
let gameOverSound = new Audio('../Music/commercial-rock-beats-spin-11249.mp3');
let musicSound = new Audio('../Music/hip-hop-rock-beats-118000.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let SnakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // Check collision with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function generateFood() {
    food = { x: Math.floor(Math.random() * 18) + 1, y: Math.floor(Math.random() * 18) + 1 };
}

function gameEngine() {
    if (isCollide(SnakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!! Press any key to play again");
        SnakeArr = [{ x: 13, y: 15 }];
        gameOverSound.pause();
        musicSound.play();
        score = 0;
    }

    if (SnakeArr[0].x === food.x && SnakeArr[0].y === food.y) {
        SnakeArr.unshift({ x: SnakeArr[0].x + inputDir.x, y: SnakeArr[0].y + inputDir.y });
        generateFood();
        foodSound.play();
        score++;
        speed+=0.25
    }

    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };
    }
    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y += inputDir.y;

    document.getElementById('board').innerHTML = "";
    SnakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        document.getElementById('board').appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    document.getElementById('board').appendChild(foodElement);

    document.getElementById('score').innerText = "Score: " + score;
}

window.requestAnimationFrame(main);
musicSound.play();

window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) {
                inputDir = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (inputDir.y !== -1) {
                inputDir = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (inputDir.x !== 1) {
                inputDir = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (inputDir.x !== -1) {
                inputDir = { x: 1, y: 0 };
            }
            break;
        default:
            break;
    }
});
