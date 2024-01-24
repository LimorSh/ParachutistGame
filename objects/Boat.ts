import Parachutist from './Parachutist';

// Represents the player-controlled boat that is trying to catch the falling objects
export default class Boat {
    private readonly imageSrc = './resources/images/boat.png';
    private readonly image: HTMLImageElement;
    public x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly speed: number;

    constructor(canvas: HTMLCanvasElement | null, yBottom: number) {
        this.image = new Image();
        this.image.src = this.imageSrc;

        this.width = 80;
        this.height = 60;
        this.x = (canvas?.width ?? 0) / 2 - this.width / 2; // Initial x position
        this.y = yBottom - this.height;
        this.speed = 10;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
            parachutist.y >= this.y - (this.height * 0.5) // Adjust for catching range
        );
    }
}
