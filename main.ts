import GameLogic from './objects/GameLogic';


const canvas: HTMLCanvasElement | null = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

if (!canvas || !ctx) {
    throw new Error("Canvas not supported");
}

const backgroundImage = new Image();
backgroundImage.src = './resources/images/background.png';
const seaImage = new Image();
seaImage.src = './resources/images/sea.png';
const seaImageHeight = canvas.height * 0.2;
const seaImageWidth = canvas.width;
const seaImageX = 0;
const seaImageY = canvas.height - seaImageHeight;
const boatY = seaImageY + (0.5 * seaImageHeight)

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasMiddleWidth = canvas.width / 2;
let gameLogic: GameLogic = new GameLogic(canvasMiddleWidth, boatY);

function updateGame() {
    // Check if canvas is null, and if so, return to avoid further execution
    if (!canvas || !ctx) {
        console.error("Canvas or context is null.");
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(seaImage, seaImageX, seaImageY, seaImageWidth, seaImageHeight);

    gameLogic.drawBoat(ctx)
    gameLogic.drawAirplane(ctx);
    gameLogic.drawParachutists(ctx);

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
