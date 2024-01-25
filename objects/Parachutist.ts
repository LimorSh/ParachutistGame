import FallingElement from "./FallingElement";
import GameElement from "./GameElement";

// Implements a falling element
export default class Parachutist implements GameElement, FallingElement {
    private readonly imageSrc = './resources/images/parachutist.png';
    private readonly image: HTMLImageElement;
    readonly x: number;
    public y: number;
    readonly width: number;
    readonly height: number;
    readonly speed: number;

    // constructor(canvas: HTMLCanvasElement, x: number, y: number) {
    constructor(x: number, y: number) {
        this.image = new Image();
        this.image.src = this.imageSrc;

        this.x = x; // Initial x position
        this.y = y; // Start from the top
        this.width = 50;
        this.height = 60;
        this.speed = 1; // Falling speed
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    fall() {
        this.y += this.speed;
    }
}
