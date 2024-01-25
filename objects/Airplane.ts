import Parachutist from './Parachutist';
import GameElement from "./GameElement";

// Represents the flying element that is dropping the falling elements.
export default class Airplane implements GameElement {
    private readonly DROP_INTERVAL = 5000;
    private readonly DEFAULT_IMAGE_SRC = './resources/images/plane.png';
    private readonly image: HTMLImageElement;
    private direction: number;  // 1 is right, -1 is left
    private lastDropTime: number;
    private _parachutists: Parachutist[];
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    // TODO: consider managing the sizes here in some way,
    //  so that they will be derivatives from the canvas sizes from outside.
    constructor(x: number, imageSrc?: string) {
        this.image = new Image();
        this.image.src = imageSrc || this.DEFAULT_IMAGE_SRC;
        this.direction = 1;
        this.lastDropTime = 0;
        this._parachutists = []
        this.x = x;
        this.y = 50;
        this.width = 120;
        this.height = 90;
        this.speed = 1;
    }

    get parachutists(): Parachutist[] {
        return this._parachutists;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    public move(leftEdge: number, rightEdge: number): void {
        this.x += this.speed * this.direction;

        if (this.isReachedEdge(leftEdge, rightEdge)) {
            this.direction *= -1;
        }
    }

    private isReachedEdge(leftEdge: number, rightEdge: number): boolean {
        return this.x < leftEdge || this.x + this.width > rightEdge;
    }

    public shouldDropParachutist(currentTime: number): boolean {
        return currentTime - this.lastDropTime > this.DROP_INTERVAL;
    }

    public dropParachutist(currentTime: number): void {
        let parachutist = new Parachutist(this.getMiddlePosition(), this.getBottom());
        this._parachutists.push(parachutist);
        this.lastDropTime = currentTime;
    }

    private getMiddlePosition(): number {
        return this.x + this.width / 2;
    }

    private getBottom(): number {
        return this.y + this.height;
    }

    // TODO: replace filter with slice for more efficiency.
    public removeParachutist(parachutist: Parachutist): void {
        this._parachutists = this._parachutists.filter(p => p !== parachutist);
    }
}
