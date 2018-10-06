
// import song from './assets/dalezy_-_tu_page.xm';
/**
 * TODO:
 * - character animation for all directions
 * - better keyboard support with fixed update rate
 * - local storage for last level (also nice for tetris highscore)
 */
import song from './assets/keith303_-_tang.xm';

import kwirkImage from './assets/kwirk.png';
import tileImage from './assets/tiles.png';

import rot from './assets/rotating.png';
import { IBlock } from './blocks/IBlock';
import { CollisionMap } from './CollisionMap';
import { AbstractLevel } from './levels/AbstractLevel';
import { Level1 } from './levels/Level1';
import { Level2 } from './levels/Level2';
import { Level3 } from './levels/Level3';
import { Level4 } from './levels/Level4';
import { Level5 } from './levels/Level5';
import { Player } from './Player';

import { SoundEngine } from './SoundEngine';

import bumpSound from './assets/sounds/bump.wav';
import fillSound from './assets/sounds/fill.wav';
import flipSound from './assets/sounds/flip.wav';
import initSound from './assets/sounds/init.wav';
import pushSound from './assets/sounds/push.wav';
import { Level6 } from './levels/Level6';
import { Level7 } from './levels/Level7';

const soundEngine = SoundEngine.getInstance();
soundEngine.playExtendedModule(song);

export enum Sound {
    PUSH = 'push',
    BUMP = 'bump',
    FLIP = 'flip',
    FILL = 'fill',
    INIT = 'goal'
}

soundEngine.loadSound(Sound.PUSH, pushSound);
soundEngine.loadSound(Sound.BUMP, bumpSound);
soundEngine.loadSound(Sound.FLIP, flipSound);
soundEngine.loadSound(Sound.FILL, fillSound);
soundEngine.loadSound(Sound.INIT, initSound);

const canvas: HTMLCanvasElement = document.createElement('canvas');

canvas.width = 20 * 8;
canvas.height = 18 * 8;

canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
    'image-rendering: -moz-crisp-edges;' + // FireFox
    'image-rendering: -o-crisp-edges;' +  // Opera
    'image-rendering: -webkit-crisp-edges;' + // Chrome
    'image-rendering: crisp-edges;' + // Chrome
    'image-rendering: -webkit-optimize-contrast;' + // Safari
    'image-rendering: pixelated; ' + // Future browsers
    '-ms-interpolation-mode: nearest-neighbor;'; // IE

canvas.style.width = `${canvas.width * 2}px`;
canvas.style.height = `${canvas.height * 2}px`;

document.body.appendChild(canvas);

const context: CanvasRenderingContext2D = canvas.getContext('2d');

context.fillRect(0, 0, 256, 224);

const tiles: HTMLImageElement = new Image();
tiles.src = tileImage;

const kwirk: HTMLImageElement = new Image();
kwirk.src = kwirkImage;

export const rotImage: HTMLImageElement = new Image();
rotImage.src = rot;

const all: Array<AbstractLevel> = [
    new Level1(),
    new Level2(),
    new Level3(),
    new Level4(),
    new Level5(),
    new Level6(),
    new Level7()
];
let currentLev: number = 6;
const lev: AbstractLevel = all[currentLev];
let level = lev.getLevel();
let moveableObjects = lev.getEnities();
let players: Array<Player> = lev.getStartPos();
let currentPlayerIndex: number = 0;

function draw() {
    context.clearRect(0, 0, 20 * 8, 18 * 8);

    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            if (level[y][x] !== 8) {
                context.drawImage(tiles, level[y][x] * 8, 0, 8, 8, x * 8, y * 8, 8, 8);
            }
        }
    }

    moveableObjects.forEach(x => x.draw(context, (Date.now() - lastTime) * 0.006));

    players.forEach(player => player.draw(context, lastTime, kwirk));

    requestAnimationFrame(() => draw());
}

requestAnimationFrame(() => draw());

document.addEventListener('keydown', (event: KeyboardEvent) => {

    if (event.keyCode === 37) {
        move(-1, 0);
    }

    if (event.keyCode === 39) {
        move(1, 0);
    }

    if (event.keyCode === 38) {
        move(0, -1);
    }

    if (event.keyCode === 40) {
        move(0, 1);
    }

    if (event.key === 'r') {
        lastTime = Date.now();
        const lev2 = all[currentLev];
        level = lev2.getLevel();
        moveableObjects = lev2.getEnities();
        players = lev2.getStartPos();
        SoundEngine.getInstance().play(Sound.INIT);
    }

    if (event.key === 's') {
        const currentPlayer: Player = players[currentPlayerIndex];
        currentPlayer.setOldPosition(currentPlayer);
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }

});

let lastTime = 0;
function move(dx: number, dy: number): void {
    lastTime = Date.now();
    const currentPlayer: Player = players[currentPlayerIndex];
    currentPlayer.setOldPosition(currentPlayer);
    const newPlayer: Player = new Player(currentPlayer.getX() + dx, currentPlayer.getY() + dy);

    const colMap: CollisionMap = new CollisionMap(level[0].length, level.length);

    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            colMap.set(x, y, 0);
            if (level[y][x] !== 8 && level[y][x] !== 9 && level[y][x] !== 10 && level[y][x] !== 11) {
                colMap.set(x, y, 1);
            }

            if (level[y][x] === 12) {
                colMap.set(x, y, 2);
            }
        }
    }

    if (colMap.get(newPlayer.getX(), newPlayer.getY()) > 0) {
        // if the potential position is not walkable return
        SoundEngine.getInstance().play(Sound.BUMP);
        return;
    }

    const collistion: IBlock = moveableObjects.find((x: IBlock) => {
        return x.collides(newPlayer.getX(), newPlayer.getY());
    });

    // no collisiton
    if (collistion === undefined) {
        currentPlayer.setX(newPlayer.getX());
        currentPlayer.setY(newPlayer.getY());

        if (level[currentPlayer.getY()][currentPlayer.getX()] === 10) {
            const activePlayers: Array<Player> = players.filter(player => player.finished === false);

            // this could probably done a bit smarter! :)
            if (activePlayers.length > 1) {
                const index = activePlayers.indexOf(currentPlayer);
                const myNewPlayer: Player = activePlayers[(index + 1) % activePlayers.length];
                currentPlayer.finished = true;
                players = players.filter(player => player.finished === false);
                currentPlayerIndex = players.indexOf(myNewPlayer);
            } else {
                currentLev = (currentLev + 1) % all.length;
                const lev2 = all[currentLev];
                level = lev2.getLevel();
                moveableObjects = lev2.getEnities();
                players = lev2.getStartPos();
                SoundEngine.getInstance().play(Sound.INIT);
            }
        }
        return;
    }

    const other: Array<IBlock> = moveableObjects.filter((x: IBlock) => {
        return x !== collistion;
    });

    // fill collisiton map with all obstacles that we did not collide with
    other.forEach((x) => {
        x.fill(colMap);
    });

    const kill: boolean = collistion.handleCollision(currentPlayer, newPlayer, colMap, level, lastTime);

    if (kill) {
        moveableObjects = other;
    }

}
