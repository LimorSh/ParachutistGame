import Parachutist from './Parachutist';
import GameElement from "./GameElement";

// Represents the player-controlled boat that is trying to catch the falling elements.
export default class Boat implements GameElement {
    private readonly DEFAULT_IMAGE_SRC = './resources/images/boat.png';
    private readonly image: HTMLImageElement;
    public x: number;   // TODO: find a way to make this field not public
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly speed: number;

    // TODO: consider managing the sizes here in some way,
    //  so that they will be derivatives from the canvas sizes from outside.
    constructor(position: number, bottom: number, imageSrc?: string) {
        this.image = new Image();
        this.image.src = imageSrc || this.DEFAULT_IMAGE_SRC;
        this.width = 90;
        this.height = 70;
        this.x = position - this.getMiddleBoatWidth();
        this.y = bottom - this.height;
        this.speed = 10;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    public move(position: number): void {
        this.x = position - this.getMiddleBoatWidth();
    }

    public moveLeft(leftEdge: number): void {
        this.x -= this.speed;

        if (this.isReachedLeftEdge(leftEdge)) {
            this.x = leftEdge;
        }
    }

    private isReachedLeftEdge(leftEdge: number): boolean {
        return this.x < leftEdge;
    }

    public moveRight(rightEdge: number): void {
        this.x += this.speed;

        if (this.isReachedRightEdge(rightEdge)) {
            this.x = rightEdge - this.width;
        }
    }

    private isReachedRightEdge(rightEdge: number): boolean {
        return this.x + this.width > rightEdge;
    }

    // TODO: bug fix - if the parachutist has already reached the boat bottom, it should return false.
    //  Should return true if and only if the parachutist is above the middle of the boat.
    public isCatch(parachutist: Parachutist): boolean {
        return (
            parachutist.x >= this.x &&
            parachutist.x <= this.x + this.width &&
            parachutist.y >= this.y - (this.height * 0.5)
        );
    }

    private getMiddleBoatWidth(): number {
        return this.width / 2;
    }
}
