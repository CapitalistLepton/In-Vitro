import GameEngine from "./game-engine";

window.onload = main;

function main(): void {
    const game = new GameEngine();

    const canvas = <HTMLCanvasElement> document.getElementById("game");
    if (canvas != null) {
        const ctx = canvas.getContext("2d");
        if (ctx != null) {
            game.start(ctx);
        } else {
            console.error("Cannot get canvas context");
        }
    } else {
        console.error("Cannot get canvas");
    }
}
