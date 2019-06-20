
/*
 *  Copyright (C) 2019 Zane Littrell
 *
 *  This file is part of In-Vitro.
 *
 *  In-Vitro is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  In-Vitro is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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
        let that = this;
        console.log("Started");
        window.setInterval(function() {
            console.log("running");
            that.draw();
            that.update();
        }, 10);
    }

    private update() {
        this.bacteriaGrid.moveBacteria();
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
