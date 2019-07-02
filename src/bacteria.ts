
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

class Bacterium {

    private static prng = new Prando(42);

    private genome: string;
    private moves: Array<[number, number]>;
    public position: [number, number];
    public id: number;

    constructor(id: number) {
        let random = Bacterium.prng.next();
        if (random > 0.75) {
            this.genome = "AA";
        } else {
            this.genome = "Aa";
        }

        random = Bacterium.prng.next();
        if (random > 0.67) {
            this.genome += "BB";
        } else if (random > 0.33) {
            this.genome += "Bb";
        } else {
            this.genome += "bb";
        }

        this.genome += "Cc";
        this.genome += "Dd";

        this.id = id;
    }

    possibleMoves(): Array<[number, number]> {
        if (!this.moves) {
            let moves: Array<[number, number]>|null = null;
            let gene = this.genome.substr(6, 8);
            console.debug(gene);
            switch (gene) {
                case "DD": moves = [[-1, -1], [0, -1], [1, -1], [-1, 0],
                    [1, 0], [-1, 1], [0, 1], [1, 1]]; break;
                case "Dd": moves = [[0, -1], [-1, 0], [1, 0], [0, 1]];
                    break;
                case "dd": moves = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
                    break;
                default: console.error("Invalid 'D' gene");
            }
            if (moves) {
                this.moves = moves;
            }
        }
        return this.moves;
    }

    getPos(): [number, number] {
        return this.position;
    }

    setPos(x: number, y: number): void {
        this.position = [-1, -1];
        this.position[0] = x;
        this.position[1] = y;
    }

    toString(): string {
        return this.genome;
    }
}

export default Bacterium;
