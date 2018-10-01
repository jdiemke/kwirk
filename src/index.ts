import 'jsxm/xm';
import 'jsxm/xmeffects';
import song from './assets/dalezy_-_tu_page.xm';
import kwirkImage from './assets/kwirk.png';
import tileImage from './assets/tiles.png';

import rot from './assets/rotating.png';
import { CollisionMap } from './CollisionMap';
import { IBlock } from './IBlock';
import { AbstractLevel } from './levels/AbstractLevel';
import { Level1 } from './levels/Level1';
import { Level2 } from './levels/Level2';
import { Level3 } from './levels/Level3';
import { Level4 } from './levels/Level4';
import { Level5 } from './levels/Level5';
import { Player } from './Player';

XMPlayer.init();

function playExtendedModule(filename: string) {
    return fetch(filename)
        .then((response: Response) => response.arrayBuffer())
        .then((arrayBuffer: ArrayBuffer) => {
            if (arrayBuffer) {
                XMPlayer.load(arrayBuffer);
                XMPlayer.play();
            } else {
                console.log('unable to load', filename);
            }
        });
}

playExtendedModule(song);
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

canvas.style.width = `${canvas.width * 4}px`;
canvas.style.height = `${canvas.height * 4}px`;

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
    new Level5()
];
let currentLev: number = 0;
const lev: AbstractLevel = all[currentLev];
let level = lev.getLevel();
let moveableObjects = lev.getEnities();
let player = lev.getStartPos();

function draw() {
    context.clearRect(0, 0, 20 * 8, 18 * 8);
    context.drawImage(
        kwirk,
        (Math.floor(Date.now() * 0.008) % 2) * 8, 0, 8, 16, player.getX() * 8, player.getY() * 8 - 3, 8, 16);

    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            if (level[y][x] !== 8) {
                context.drawImage(tiles, level[y][x] * 8, 0, 8, 8, x * 8, y * 8, 8, 8);
            }
        }
    }

    moveableObjects.forEach(x => x.draw(context));

    context.font = '18px Arial';

    if (level[player.getY()][player.getX()] === 10) {
        context.fillText('You Won!', 10, 50);
    }

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

});

function move(dx: number, dy: number): void {

    const newPlayer: Player = new Player(player.getX() + dx, player.getY() + dy);

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
        return;
    }

    const collistion: IBlock = moveableObjects.find((x: IBlock) => {
        return x.collides(newPlayer.getX(), newPlayer.getY());
    });

    // no collisiton
    if (collistion === undefined) {
        player.setX(newPlayer.getX());
        player.setY(newPlayer.getY());

        if (level[player.getY()][player.getX()] === 10) {
            currentLev = (currentLev + 1) % all.length;
            const lev2 = all[currentLev];
            level = lev2.getLevel();
            moveableObjects = lev2.getEnities();
            player = lev2.getStartPos();
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

    const kill: boolean = collistion.handleCollision(player, newPlayer, colMap, level);

    if (kill) {
        moveableObjects = other;
    }

}
