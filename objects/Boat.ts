import Parachutist from './Parachutist';

// Represents the player-controlled boat that is trying to catch the falling objects
export default class Boat {
    private readonly DEFAULT_IMAGE_SRC  = './resources/images/boat.png';
    private readonly imageSrc;
    private readonly image: HTMLImageElement;
    public x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly speed: number;

    constructor(x: number, y: number, imageSrc?: string) {
        this.image = new Image();
        this.imageSrc = imageSrc || this.DEFAULT_IMAGE_SRC;
        this.image.src = this.imageSrc;

        this.width = 80;
        this.height = 60;
        // this.x = (canvas?.width ?? 0) / 2 - this.width / 2; // Initial x position
        this.x = x - this.getMiddleBoatWidth();
        this.y = y - this.height;
        this.speed = 10;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveByX(x: number) {
        this.x = x - this.getMiddleBoatWidth();
    }

    moveLeft() {
        this.x -= this.speed;

        if (this.x < 0) {
            this.x = 0;
        }
    }

    moveRight(canvasRightEdge: number) {
        this.x += this.speed;

        if (this.x + this.width > canvasRightEdge) {
            this.x = canvasRightEdge - this.width;
        }
    }

    isCatch(parachutist: Parachutist): boolean {
        return (
            parachutist.x >= this.x &&
            parachutist.x <= this.x + this.width &&
            parachutist.y >= this.y - (this.height * 0.5) // Adjust for catching range
            // parachutist.y >= this.y - (this.height * 0.5) && // Adjust for catching range
            // parachutist.y <= this.y - this.height
        );
    }

    getMiddleBoatWidth() {
        return this.width / 2;
    }
}
