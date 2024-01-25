import Boat from "./Boat";
import Parachutist from "./Parachutist";
import Airplane from "./Airplane";
import ImageManager from "./ImageManager";

// Manages the game state and logic
export default class GameLogic {
    private readonly CATCH_POINTS = 10;
    private readonly TOTAL_LIVES = 3;
    // private imageManager: ImageManager;
    private readonly dropInterval = 5000; // Set the interval between parachutist dropping in milliseconds
    private lastDropTime = 0;
    private readonly _airplane: Airplane;
    private _boat!: Boat;
    private _score!: number;
    private _lives!: number;


    // constructor(canvas: HTMLCanvasElement, imageManager: ImageManager, boatYBottom: number) {
    constructor(canvasMiddleWidth: number, boatY: number) {
        // this.imageManager = imageManager;

        this.initGame(canvasMiddleWidth, boatY);
        this._airplane = new Airplane(canvasMiddleWidth);
    }

    get boat(): Boat {
        return this._boat;
    }

    get airplane(): Airplane {
        return this._airplane;
    }

    get score(): number {
        return this._score;
    }

    get lives(): number {
        return this._lives;
    }

    resetGame(boatX: number, boatY: number): void {
        this.initGame(boatX, boatY);
    }

    private initGame(boatX: number, boatY: number): void {
        this._score = 0;
        this._lives = this.TOTAL_LIVES;
        this._boat = new Boat(boatX, boatY);
    }

    updateGameElements(canvasRightEdge: number, canvasBottom: number) {
        this.updateAirplane(canvasRightEdge);
        this.updateParachutists(canvasBottom);
    }

    updateAirplane(canvasRightEdge: number): void {
        this._airplane.move(canvasRightEdge);

        const currentTime = Date.now();

        // Call the method to drop parachutists from time to time
        if (currentTime - this.lastDropTime > this.dropInterval) {
            this._airplane.dropParachutist();
            this.lastDropTime = currentTime;
        }
    }

    updateParachutists(canvasBottom: number): void {
        for (let parachutist of this._airplane.parachutists) {
            if (parachutist) {
                parachutist.fall();

                // Check if parachutist reaches the water
                if (this.isParachutistReachedWater(parachutist, canvasBottom)) {
                    this.decreaseLives();
                    this._airplane.removeParachutist(parachutist)
                }

                // Check if boat catches the parachutist
                if (this.isBoatCatchParachutist(parachutist)) {
                    this.increaseScore();
                    this._airplane.removeParachutist(parachutist)
                }
            }
        }
    }

    isParachutistReachedWater(parachutist: Parachutist, canvasBottom: number): boolean {
        return parachutist.y > canvasBottom;
    }

    isBoatCatchParachutist(parachutist: Parachutist): boolean {
        return this.boat.isCatch(parachutist)
    }

    isGameOver(): boolean {
        return this.lives <= 0
    }

    decreaseLives(): void {
        this._lives--;
    }

    increaseScore(): void {
        this._score += this.CATCH_POINTS;
    }

    moveBoatLeft(): void {
        this.boat.moveLeft();
    }

    moveBoatRight(canvasRightEdge: number): void {
        this.boat.moveRight(canvasRightEdge);
    }

    moveBoatByX(x: number): void {
        this.boat.moveByX(x);
    }
}