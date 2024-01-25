import Drawer from './objects/Drawer';
import GameLogic from './objects/GameLogic';


const canvas: HTMLCanvasElement | null = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

if (!canvas || !ctx) {
    throw new Error("Canvas not supported");
}

const BACKGROUND_IMAGE_SRC = './resources/images/background.png';
const SEA_IMAGE_SRC = './resources/images/sea.png';

const backgroundImage = new Image();
backgroundImage.src = BACKGROUND_IMAGE_SRC;
const seaImage = new Image();
seaImage.src = SEA_IMAGE_SRC;

const seaImageHeight = canvas.height * 0.2;
const seaImageY = canvas.height - seaImageHeight;
const boatY = seaImageY + (0.5 * seaImageHeight)

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasMiddleWidth = canvas.width / 2;
let drawer: Drawer = new Drawer();
let gameLogic: GameLogic = new GameLogic(canvasMiddleWidth, boatY);

function updateGame() {
    // Check if canvas is null, and if so, return to avoid further execution
    if (!canvas || !ctx) {
        console.error("Canvas or context is null.");
        return;
    }

    clearCanvas();
    drawImages();
    drawElements();

    gameLogic.updateGameElements(canvasWidth, canvasHeight);

    // Display score and lives
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('  Score: ' + gameLogic.score, 10, 30);
    ctx.fillText('Lives: ' + gameLogic.lives, canvasWidth - 100, 30);

    // Check game over condition
    if (gameLogic.isGameOver()) {
        //todo: draw live: 0
        // ctx.fillStyle = 'black';
        // ctx.font = '20px Arial';
        // ctx.fillText('Lives: ' + lives, canvas.width - 100, 30);

        alert("Game Over! Your score: " + gameLogic.score);

        gameLogic.resetGame(canvasMiddleWidth, boatY);

        return; // Restart the game loop
    }
}

function clearCanvas(): void {
    if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}

function drawImages(): void {
    if (ctx) {
        drawer.drawImage(ctx, backgroundImage, 0, 0, canvasWidth, canvasHeight);
        drawer.drawImage(ctx, seaImage, 0, seaImageY, canvasWidth, seaImageHeight);
    }
}

function drawElements(): void {
    if (ctx) {
        drawer.drawElement(ctx, gameLogic.boat);
        drawer.drawElement(ctx, gameLogic.airplane);
        drawer.drawElements(ctx, gameLogic.airplane.parachutists);
    }
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            gameLogic.moveBoatLeft();
            break;
        case 'ArrowRight':
            gameLogic.moveBoatRight(canvasWidth);
            break;
    }
});

// // Mouse controls
canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    gameLogic.moveBoatByX(mouseX)
});

function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    gameLoop();
}
