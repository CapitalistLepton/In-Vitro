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
