import Boat from "./Boat";
import Parachutist from "./Parachutist";
import Airplane from "./Airplane";

// Manages the game state and logic
export default class GameLogic {
    private readonly CATCH_POINTS = 10;
    private readonly TOTAL_LIVES = 3;
    private readonly canvasLeftEdge: number;
    private readonly canvasRightEdge: number;
    private readonly canvasMiddleWidth: number;
    private readonly canvasBottom: number;
    private readonly boatBottom: number;
    private _airplane!: Airplane;
    private _boat!: Boat;
    private _score!: number;
    private _lives!: number;


    constructor(canvasWidth: number, canvasHeight: number, boatBottom: number) {
        this.canvasLeftEdge = 0;
        this.canvasRightEdge = canvasWidth;
        this.canvasMiddleWidth = canvasWidth / 2;
        this.canvasBottom = canvasHeight;
        this.boatBottom = boatBottom;

        this.initGame();
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

    public resetGame(): void {
        this.initGame();
    }

    private initGame(): void {
        this._score = 0;
        this._lives = this.TOTAL_LIVES;
        this._boat = new Boat(this.canvasMiddleWidth, this.boatBottom);
        this._airplane = new Airplane(this.canvasMiddleWidth);
    }

    public updateGameElements() {
        this.updateAirplane();
        this.updateParachutists();
    }

    private updateAirplane(): void {
        this._airplane.move(this.canvasLeftEdge, this.canvasRightEdge);

        const currentTime = Date.now();

        if (this._airplane.shouldDropParachutist(currentTime)) {
            this._airplane.dropParachutist(currentTime);
        }
    }

    private updateParachutists(): void {
        for (let parachutist of this._airplane.parachutists) {
            if (parachutist) {
                parachutist.fall();

                if (this.isParachutistReachedWater(parachutist)) {
                    this.decreaseLives();
                    this._airplane.removeParachutist(parachutist)
                }

                if (this.isBoatCatchParachutist(parachutist)) {
                    this.increaseScore();
                    this._airplane.removeParachutist(parachutist)
                }
            }
        }
    }

    private isParachutistReachedWater(parachutist: Parachutist): boolean {
        return parachutist.y > this.canvasBottom;
    }

    private isBoatCatchParachutist(parachutist: Parachutist): boolean {
        return this.boat.isCatch(parachutist)
    }

    public isGameOver(): boolean {
        return this.lives <= 0
    }

    private decreaseLives(): void {
        this._lives--;
    }

    private increaseScore(): void {
        this._score += this.CATCH_POINTS;
    }

    public moveBoat(position: number): void {
        this.boat.move(position);
    }

    public moveBoatLeft(): void {
        this.boat.moveLeft(this.canvasLeftEdge);
    }

    public moveBoatRight(): void {
        this.boat.moveRight(this.canvasRightEdge);
    }
}


