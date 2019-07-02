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

    private bacteria: Array<Bacterium>;

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
            let substr = bac.toString().substring(0, 4);
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
                default: console.error("Invalid genotype in stainBacterium");
            }
        }
        return color;
    }

    moveBacteria(): void {
        const size = BacteriaGrid.GRID_WIDTH * BacteriaGrid.GRID_HEIGHT;
        let newBacteria = new Array(size);
        for (let i = 0; i < size; i++) {
            let bac = this.bacteria[i]
            if (bac) {
                let thisY = Math.floor(i / BacteriaGrid.GRID_WIDTH);
                let thisX = i % BacteriaGrid.GRID_WIDTH;
                let moves = bac.possibleMoves();
                moves = moves.filter((coord) => {
                    let x = coord[0] + thisX;
                    let y = coord[1] + thisY;
                    return x >= 0 && x < BacteriaGrid.GRID_WIDTH && y >= 0
                        && y < BacteriaGrid.GRID_HEIGHT;
                });
                let possible = moves.map((coord) => {
                    return (coord[0] + thisX) +
                        ((coord[1] + thisY) * BacteriaGrid.GRID_WIDTH);
                });
                let rand = BacteriaGrid.prng.nextInt(0, possible.length - 1);
                let index = possible[rand];
                // Check if the place is occupied
                while (this.bacteria[index] || newBacteria[index]) {
                    let filter = possible.filter((move) => {
                        return move !== possible[rand];
                    });
                    if (filter.length === 0 || possible === filter) {
                        break; // Don't move this since it cannot move
                    }
                    possible = filter;
                    rand = BacteriaGrid.prng.nextInt(0, possible.length - 1);
                    index = possible[rand];
                }
                newBacteria[index] = bac;
            }
        }
        this.bacteria = newBacteria;
    }

    reproduce(): void {
        for (let i = 0; i < this.bacteria.length; i++) {
            if (this.bacteria[i] && BacteriaGrid.prng.next() <= 0.25) {
                let bac = this.bacteria[i].asexuallyReproduce();
                let x = Math.floor(i / BacteriaGrid.GRID_WIDTH);
                let y = i % BacteriaGrid.GRID_WIDTH;
                this.placeBacteria(bac, x, y);
            }
        }
    }

    private placeBacteria(bac: Bacterium, x: number, y: number): void {
       let possible = [
            (x - 1) + (y - 1) * BacteriaGrid.GRID_WIDTH,
            x + (y - 1) * BacteriaGrid.GRID_WIDTH,
            (x + 1) + (y - 1) * BacteriaGrid.GRID_WIDTH,
            (x - 1) + y * BacteriaGrid.GRID_WIDTH,
            (x + 1) + y * BacteriaGrid.GRID_WIDTH,
            (x - 1) + (y + 1) * BacteriaGrid.GRID_WIDTH,
            x + (y + 1) * BacteriaGrid.GRID_WIDTH,
            (x + 1) + (y + 1) * BacteriaGrid.GRID_WIDTH,
        ];
        // Remove occupied spots
        possible = possible.filter((index) => !this.bacteria[index]);
        let spot = possible[BacteriaGrid.prng.nextInt(0, possible.length - 1)];
        this.bacteria[spot] = bac;
    }
}

export default BacteriaGrid;
