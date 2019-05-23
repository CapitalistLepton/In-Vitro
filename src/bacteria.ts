
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

    constructor() {
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
    }

    toString(): string {
        return this.genome;
    }
}

export default Bacterium;
