export default class ImageManager {
    private images: Record<string, HTMLImageElement> = {};

    loadImage(key: string, src: string): void {
        const image = new Image();
        image.src = src;
        this.images[key] = image;
    }

    getImage(key: string): HTMLImageElement | undefined {
        return this.images[key];
    }
}