import { Bacterium } from "./bacteria";

window.onload = main;

function main(): void {
    const canvas = <HTMLCanvasElement> document.getElementById("game");
    if (canvas != null) {
        const ctx = canvas.getContext("2d");
        if (ctx != null) {
            ctx.fillRect(25, 25, 25, 25);
        }
    }
    const bac = new Bacterium();
    console.log("Genome: ", bac.genome);
}
