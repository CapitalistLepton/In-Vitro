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
