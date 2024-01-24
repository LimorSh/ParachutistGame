import Airplane from './objects/Airplane';
import Boat from './objects/Boat';
import Parachutist from './objects/Parachutist';


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


let boat = new Boat(canvas, boatY);
let parachutists: Parachutist[] = [];
let airplane = new Airplane(canvas);
let score = 0;
let lives = 3;
const spawnInterval = 5000; // Set the interval between parachutist spawns in milliseconds
let lastSpawnTime = 0;

function updateGame() {
    // Check if canvas is null, and if so, return to avoid further execution
    if (!canvas || !ctx) {
        console.error("Canvas or context is null.");
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(seaImage, seaImageX, seaImageY, seaImageWidth, seaImageHeight);

    // Draw airplane
    if (airplane && airplane.x !== undefined && airplane.y !== undefined && airplane.width && airplane.height) {
        airplane.draw(ctx);
    }

    // Draw boat
    if (boat && boat.x !== undefined && boat.y !== undefined && boat.width && boat.height) {
        boat.draw(ctx)
    }

    // Draw parachutists
    for (let parachutist of parachutists) {
        if (parachutist && parachutist.x !== undefined && parachutist.y !== undefined) {
            parachutist.draw(ctx)
            console.log('Parachutist position:', parachutist.x, parachutist.y);
        }
    }

    // Display score and lives
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('  Score: ' + score, 10, 30);
    ctx.fillText('Lives: ' + lives, canvas.width - 100, 30);

    // Update airplane
    if (airplane) {
        airplane.move(canvas); // Pass deltaTime to adjust movement based on frame time
        const currentTime = Date.now();

        // Call the method to drop parachutists from time to time
        if (currentTime - lastSpawnTime > spawnInterval) {
            airplane.dropParachutist(parachutists);
            lastSpawnTime = currentTime; // Update the last spawn time
        }
    }

    // Update parachutists
    for (let parachutist of parachutists) {
        if (parachutist) {
            console.log('Parachutist position:', parachutist.x, parachutist.y);

            parachutist.fall();

            // Check if parachutist reaches the water
            if (parachutist.y > canvas.height) {
                lives--;
                parachutists = parachutists.filter(p => p !== parachutist); // Remove fallen parachutist
            }

            // Check if boat catches the parachutist
            if (boat && boat.isCatch(parachutist)) {
                score += 10;
                parachutists = parachutists.filter(p => p !== parachutist); // Remove caught parachutist
            }
        }
    }

    // Check game over condition
    if (lives <= 0) {
        //todo: draw live: 0
        // ctx.fillStyle = 'black';
        // ctx.font = '20px Arial';
        // ctx.fillText('Lives: ' + lives, canvas.width - 100, 30);

        alert("Game Over! Your score: " + score);
        resetGame();
        return; // Stop the game loop
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    boat = new Boat(canvas, boatY);
    parachutists = [];
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            boat.moveLeft();
            break;
        case 'ArrowRight':
            boat.moveRight(canvas);
            break;
    }
});

// Mouse controls
canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    boat.x = mouseX - boat.width / 2;
});

function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    gameLoop();
}
