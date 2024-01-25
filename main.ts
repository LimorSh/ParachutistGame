import Drawer from './objects/Drawer';
import GameLogic from './objects/GameLogic';


const canvas: HTMLCanvasElement | null = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const BACKGROUND_IMAGE_SRC = './resources/images/background.png';
const SEA_IMAGE_SRC = './resources/images/sea.png';

const backgroundImage = new Image();
backgroundImage.src = BACKGROUND_IMAGE_SRC;
const seaImage = new Image();
seaImage.src = SEA_IMAGE_SRC;

const seaImageHeight = CANVAS_HEIGHT * 0.2;
const seaImageY = CANVAS_HEIGHT - seaImageHeight;
const boatBottom = seaImageY + (0.5 * seaImageHeight)

let drawer: Drawer = new Drawer();
let gameLogic: GameLogic = new GameLogic(CANVAS_WIDTH, CANVAS_HEIGHT, boatBottom);

function updateGame() {
    clearCanvas();
    drawImages();
    drawElements();

    gameLogic.updateGameElements();

    displayScore();
    displayLives();

    if (gameLogic.isGameOver()) {
        alert("Game Over! Your score: " + gameLogic.score);
        gameLogic.resetGame();

        return;
    }
}

function clearCanvas(): void {
    if (ctx) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function drawImages(): void {
    if (ctx) {
        drawer.drawImage(ctx, backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawer.drawImage(ctx, seaImage, 0, seaImageY, CANVAS_WIDTH, seaImageHeight);
    }
}

function drawElements(): void {
    if (ctx) {
        drawer.drawElement(ctx, gameLogic.boat);
        drawer.drawElement(ctx, gameLogic.airplane);
        drawer.drawElements(ctx, gameLogic.airplane.parachutists);
    }
}

function displayScore(): void {
    if (ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('  Score: ' + gameLogic.score, 10, 30);
    }
}

function displayLives(): void {
    if (ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Lives: ' + gameLogic.lives, CANVAS_WIDTH - 100, 30);
    }
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            gameLogic.moveBoatLeft();
            break;
        case 'ArrowRight':
            gameLogic.moveBoatRight();
            break;
    }
});

// // Mouse controls
canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    gameLogic.moveBoat(mouseX)
});

function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    gameLoop();
}

