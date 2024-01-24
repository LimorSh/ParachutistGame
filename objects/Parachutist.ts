import FallingObject from "./FallingObject";

// Implements a falling object
export default class Parachutist implements FallingObject{
// export default class Parachutist implements FallingObject{
    readonly x: number;
    public y: number;
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly speed: number;

    // constructor(canvas: HTMLCanvasElement, x: number, y: number) {
    constructor(x: number, y: number) {
        // this.x = Math.random() * canvas.width; // Initial x position
        this.x = x; // Initial x position
        // this.y = 0; // Start from the top
        this.y = y; // Start from the top
        this.width = 20;
        this.height = 20;
        this.color = "red"
        this.speed = 1; // Falling speed
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    fall() {
        this.y += this.speed;
    }
}
