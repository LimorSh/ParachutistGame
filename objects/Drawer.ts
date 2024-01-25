import GameElement from "./GameElement";

export default class Drawer {
    drawElements(ctx: CanvasRenderingContext2D, elements: GameElement[]): void {
        for (let element of elements) {
            if (element) {
                this.drawElement(ctx, element);
            }
        }
    }

    drawElement(ctx: CanvasRenderingContext2D, element: GameElement): void {
        if (element) {
            element.draw(ctx)
        }
    }

    drawImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement,
              x: number, y: number, width: number, height: number): void {
        ctx.drawImage(image, x, y, width, height);
    }
}