import FallingElement from "./FallingElement";
import GameElement from "./GameElement";

// Represents the falling element and implements FallingElement interface
export default class Parachutist implements GameElement, FallingElement {
    private readonly DEFAULT_IMAGE_SRC = './resources/images/parachutist.png';
    private readonly image: HTMLImageElement;
    readonly x: number;
    public y: number;   // TODO: find a way to make this field not public
    readonly width: number;
    readonly height: number;
    readonly speed: number;

    // TODO: consider managing the sizes here in some way,
    //  so that they will be derivatives from the canvas sizes from outside.
    constructor(x: number, y: number, imageSrc?: string) {
        this.image = new Image();
        this.image.src = imageSrc || this.DEFAULT_IMAGE_SRC;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.speed = 1;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    public fall(): void {
        this.y += this.speed;
    }
}
