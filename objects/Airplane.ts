import Parachutist from './Parachutist';
import GameElement from "./GameElement";

// Represents the flying object that is dropping the falling objects
export default class Airplane implements GameElement {
    private readonly DROP_INTERVAL = 5000;
    private readonly IMAGE_SRC = './resources/images/plane.png';
    private readonly image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: number;
    private _parachutists: Parachutist[];
    private lastDropTime: number;

    constructor(x: number) {
        this.image = new Image();
        this.image.src = this.IMAGE_SRC;

        this.x = x; // Initial x position at the center of the canvas
        this.y = 50; // Initial y position
        this.width = 100; // Adjust as needed
        this.height = 70; // Adjust as needed
        this.speed = 1; // Adjust as needed
        this.direction = 1;
        this._parachutists = []
        this.lastDropTime = 0;
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

    public shouldDropParachutist(currentTime: number) {
        return currentTime - this.lastDropTime > this.DROP_INTERVAL;
    }

    dropParachutist(currentTime: number) {
        this._parachutists.push(new Parachutist(this.x + this.width / 2, this.y + this.height));
        this.lastDropTime = currentTime;
    }

    removeParachutist(parachutist: Parachutist) {
        this._parachutists = this._parachutists.filter(p => p !== parachutist);
    }
}
