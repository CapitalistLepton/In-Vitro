import Prando from "prando";

class Bacterium {
    static prng = new Prando(42);
    genome: string;
    constructor() {
        this.genome = "AABBCC";
        console.log(Bacterium.prng.next(1,10));
    }
}

export { Bacterium };
