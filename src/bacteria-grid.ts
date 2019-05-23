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

class BacteriaGrid {

    static readonly GRID_WIDTH = 60;
    static readonly GRID_HEIGHT = 40;

    private static readonly NUM_BACTERIA = 45;

    private static prng = new Prando(42);

    private bacteria: Array<Bacterium|null>;

    constructor() {
        this.bacteria = new Array(BacteriaGrid.GRID_WIDTH * BacteriaGrid.GRID_HEIGHT);
        for (let i = 0; i < BacteriaGrid.NUM_BACTERIA; i++) {
            let rand = BacteriaGrid.prng.nextInt(0, BacteriaGrid.GRID_WIDTH *
                BacteriaGrid.GRID_HEIGHT - 1);
            while (this.bacteria[rand] != null) {
                rand = BacteriaGrid.prng.nextInt(0, BacteriaGrid.GRID_WIDTH *
                    BacteriaGrid.GRID_HEIGHT - 1);
            }
            this.bacteria[rand] = new Bacterium();
        }
    }

    stainBacterium(row: number, col: number): string {
        let color = "#ffffff";
        let bac = this.bacteria[row * BacteriaGrid.GRID_WIDTH + col];
        if (bac != null) {
            let genes = bac.toString();
            let substr = genes.substring(0, 4);
            console.log(substr);
            switch (substr) {
                case "AABB": color = "#ff0000"; break;
                case "AaBB": color = "#ff8800"; break;
                case "aaBB": color = "#ffff00"; break;
                case "AABb": color = "#00ff00"; break;
                case "AaBb": color = "#00ffff"; break;
                case "aaBb": color = "#0000ff"; break;
                case "AAbb": color = "#000000"; break;
                case "Aabb": color = "#555555"; break;
                case "aabb": color = "#aaaaaa"; break;
                default: console.error("Wrong");
            }
        }
        console.debug(color);
        return color;
    }
}

export default BacteriaGrid;
