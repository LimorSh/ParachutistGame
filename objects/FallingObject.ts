// Represents a falling object from the Airplane
export default interface FallingObject{
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;

    fall(): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
