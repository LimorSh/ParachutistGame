import Parachutist from './Parachutist';
import GameElement from "./GameElement";

// Represents the flying object that is dropping the falling objects
export default class Airplane implements GameElement {
    private readonly imageSrc = './resources/images/plane.png';
    private readonly image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: number;
    private _parachutists: Parachutist[];

    constructor(x: number) {
        this.image = new Image();
        this.image.src = this.imageSrc;

        this.x = x; // Initial x position at the center of the canvas
        this.y = 50; // Initial y position
        this.width = 100; // Adjust as needed
        this.height = 70; // Adjust as needed
        this.speed = 1; // Adjust as needed
        this.direction = 1;
        this._parachutists = []
    }

    get parachutists(): Parachutist[] {
        return this._parachutists;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(canvasRightEdge: number) {
        // Move the airplane from side to side
        this.x += this.speed * this.direction;

        // Reverse direction when reaching canvas boundaries
        if (this.x < 0 || this.x + this.width > canvasRightEdge) {
            // this.speed *= -1;
            this.direction *= -1;
        }
    }

    dropParachutist() {
        this._parachutists.push(new Parachutist(this.x + this.width / 2, this.y + this.height));
    }

    removeParachutist(parachutist: Parachutist) {
        this._parachutists = this._parachutists.filter(p => p !== parachutist);
    }
}
