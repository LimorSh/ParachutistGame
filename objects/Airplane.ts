import Parachutist from './Parachutist';

// Represents the flying object that is dropping the falling object
export default class Airplane {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: number;

    constructor(canvas: HTMLCanvasElement) {
        this.x = canvas? canvas.width / 2 : 0; // Initial x position at the center of the canvas
        this.y = 50; // Initial y position
        this.width = 50; // Adjust as needed
        this.height = 20; // Adjust as needed
        this.speed = 1; // Adjust as needed
        this.direction = 1;
    }

    move(canvas: HTMLCanvasElement) {
        // Move the airplane from side to side
        this.x += this.speed * this.direction;

        // Reverse direction when reaching canvas boundaries
        if (this.x < 0 || this.x + this.width > canvas?.width) {
            // this.speed *= -1;
            this.direction *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'green'; // Adjust as needed
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    dropParachutist(parachutists: Parachutist[]) {
        parachutists.push(new Parachutist(this.x + this.width / 2, this.y + this.height));
    }
}
