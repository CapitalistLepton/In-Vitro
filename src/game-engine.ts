import Prando from "prando";
import Bacterium from "./bacteria";
import BacteriaGrid from "./bacteria-grid";

class GameEngine {

    private static readonly SQUARE_SIZE = 15;

    private bacteriaGrid: BacteriaGrid;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.bacteriaGrid = new BacteriaGrid();
    }

    start(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.draw();
    }

    private update() {
    }

    private draw() {
        this.ctx.save();
        for (let r = 0; r < BacteriaGrid.GRID_HEIGHT; r++) {
            for (let c = 0; c < BacteriaGrid.GRID_WIDTH; c++) {
                this.ctx.fillStyle = this.bacteriaGrid.stainBacterium(r, c);
                this.ctx.fillRect(c * GameEngine.SQUARE_SIZE,
                    r * GameEngine.SQUARE_SIZE, GameEngine.SQUARE_SIZE,
                    GameEngine.SQUARE_SIZE);
            }
        }
        this.ctx.restore();
    }
}

export default GameEngine;
