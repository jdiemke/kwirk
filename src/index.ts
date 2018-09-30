import 'jsxm/xm';
import 'jsxm/xmeffects';
import song from './assets/dalezy_-_tu_page.xm';
import tileImage from './assets/tiles.png';

import rot from './assets/rotating.png';
import { CollisionMap } from './CollisionMap';
import { IBlock } from './IBlock';
import { Player } from './Player';
import { RotatableBlock } from './RotateableBlock';

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

// height: 18
// width: 20
const level: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 3, 9, 9, 9, 4, 9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9, 9, 2, 0],
    [0, 3, 8, 10, 8, 9, 8, 8, 8, 6, 7, 8, 8, 8, 9, 8, 8, 8, 2, 0],
    [0, 3, 8, 11, 8, 5, 8, 8, 8, 8, 8, 8, 8, 8, 5, 8, 8, 8, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const tiles: HTMLImageElement = new Image();
tiles.src = tileImage;

const rotImage: HTMLImageElement = new Image();
rotImage.src = rot;

const moveableObjects: Array<IBlock> = [
    new RotatableBlock(7, 8, 2, rotImage), // use factory singleton for images
    new RotatableBlock(12, 8, 0, rotImage)
];

const player = new Player(16, 8);

function draw() {
    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            context.drawImage(tiles, level[y][x] * 8, 0, 8, 8, x * 8, y * 8, 8, 8);
        }
    }

    context.fillStyle = '#ff44ff';
    context.fillRect(player.getX() * 8, player.getY() * 8, 8, 8);

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
            colMap.set(x, y, level[y][x] !== 8 && level[y][x] !== 9 && level[y][x] !== 10 && level[y][x] !== 11);
        }
    }

    if (colMap.get(newPlayer.getX(), newPlayer.getY())) {
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
        return;
    }

    const other: Array<IBlock> = moveableObjects.filter((x: IBlock) => {
        return x !== collistion;
    });

    // fill collisiton map with all obstacles that we did not collide with
    other.forEach((x) => {
        x.fill(colMap);
    });

    collistion.handleCollision(player, newPlayer, colMap);

}
