import Prando from "prando";
import Bacterium from "./bacteria";

class GameEngine {

    private static readonly GRID_WIDTH = 60;
    private static readonly GRID_HEIGHT = 40;
    private static readonly NUM_BACTERIA = 45;

    private static prng = new Prando(42);

    private bacteria: Array<Bacterium|null>;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.bacteria = new Array(GameEngine.GRID_WIDTH * GameEngine.GRID_HEIGHT);
        for (let i = 0; i < GameEngine.NUM_BACTERIA; i++) {
            let rand = GameEngine.prng.nextInt(0, GameEngine.GRID_WIDTH * GameEngine.GRID_HEIGHT - 1);
            while (this.bacteria[rand] != null) {
                rand = GameEngine.prng.nextInt(0, GameEngine.GRID_WIDTH * GameEngine.GRID_HEIGHT - 1);
            }
            this.bacteria[rand] = new Bacterium();
        }
    }

    start(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.draw();
    }

    private update() {
    }

    private draw() {
        for (let r = 0; r < GameEngine.GRID_HEIGHT; r++) {
            for (let c = 0; c < GameEngine.GRID_WIDTH; c++) {
                if (this.bacteria[r * GameEngine.GRID_WIDTH + c] != null) {
                    this.ctx.fillRect(c * 10, r * 10, 10, 10);
                } else {
                    this.ctx.strokeRect(c * 10, r * 10, 10, 10);
                }
            }
        }
    }
}

export default GameEngine;
