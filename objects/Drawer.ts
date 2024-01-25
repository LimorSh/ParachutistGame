import GameElement from "./GameElement";

// Draws game elements and images.
export default class Drawer {
    public drawElements(ctx: CanvasRenderingContext2D, elements: GameElement[]): void {
        for (let element of elements) {
            if (element) {
                this.drawElement(ctx, element);
            }
        }
    }

    public drawElement(ctx: CanvasRenderingContext2D, element: GameElement): void {
        if (element) {
            element.draw(ctx)
        }
    }

    public drawImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement,
                     x: number, y: number, width: number, height: number): void {
        ctx.drawImage(image, x, y, width, height);
    }
}