export default interface GameElement {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    draw(ctx: CanvasRenderingContext2D): void;
}