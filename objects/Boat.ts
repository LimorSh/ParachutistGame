import Parachutist from './Parachutist';

// Represents the player-controlled boat that is trying to catch the falling objects
export default class Boat {
    public x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly speed: number;

    constructor(canvas: HTMLCanvasElement | null) {
        this.width = 50;
        this.height = 30;
        this.x = (canvas?.width ?? 0) / 2 - this.width / 2; // Initial x position
        this.y = (canvas?.height ?? 0) - this.height; // Start at the bottom
        this.color = "blue"
        this.speed = 10;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.x -= this.speed;
        if (this.x < 0) {
            this.x = 0;
        }
    }

    moveRight(canvas: HTMLCanvasElement) {
        if (canvas) {
            this.x += this.speed;
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
            }
        }
    }

    isCatch(parachutist: Parachutist): boolean {
        return (
            parachutist.x >= this.x &&
            parachutist.x <= this.x + this.width &&
            parachutist.y + 20 >= this.y // Adjust for catching range
        );
    }
}
