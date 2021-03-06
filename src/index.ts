/**
 * TODO:
 * - better keyboard support with fixed update rate
 * - local storage for last level (also nice for tetris highscore)
 * - Level Reference:
 *   https://www.youtube.com/watch?v=Pit-9Obf53Q
 *   https://www.youtube.com/watch?v=9hSy0scFqL8
 *   https://youtu.be/gJ9TkVNzBWQ
 *   https://www.youtube.com/watch?v=6gU1QnELinE
 */
import song from './assets/keith303_-_tang.xm';

import kwirkImage from './assets/kwirk.png';
import tileImage from './assets/tiles.png';

import rot from './assets/rotating.png';
import { IBlock } from './blocks/IBlock';
import { CollisionMap } from './CollisionMap';
import { AbstractLevel } from './levels/AbstractLevel';
import { Level1 } from './levels/going-up/Level1';
import { Level2 } from './levels/going-up/Level2';
import { Level3 } from './levels/going-up/Level3';
import { Level4 } from './levels/going-up/Level4';
import { Level5 } from './levels/going-up/Level5';
import { Player } from './Player';

import { SoundEngine } from './SoundEngine';

import bumpSound from './assets/sounds/bump.wav';
import fillSound from './assets/sounds/fill.wav';
import flipSound from './assets/sounds/flip.wav';
import initSound from './assets/sounds/init.wav';
import nextLevelSound from './assets/sounds/next.wav';
import pushSound from './assets/sounds/push.wav';
import switchSound from './assets/sounds/switch.wav';

import { Level10 } from './levels/going-up/Level10';
import { Level11 } from './levels/going-up/Level11';
import { Level6 } from './levels/going-up/Level6';
import { Level7 } from './levels/going-up/Level7';
import { Level8 } from './levels/going-up/Level8';
import { Level9 } from './levels/going-up/Level9';

import { Keyboard } from './controller/Keyboard';
import { Floor01 } from './levels/amazing-tater/puzzle-mode/level-01/Floor01';
import { Floor02 } from './levels/amazing-tater/puzzle-mode/level-01/Floor02';
import { Floor03 } from './levels/amazing-tater/puzzle-mode/level-01/Floor03';
import { Floor04 } from './levels/amazing-tater/puzzle-mode/level-01/Floor04';
import { Floor05 } from './levels/amazing-tater/puzzle-mode/level-01/Floor05';
import { Floor06 } from './levels/amazing-tater/puzzle-mode/level-01/Floor06';
import { Floor07 } from './levels/amazing-tater/puzzle-mode/level-01/Floor07';
import { Floor08 } from './levels/amazing-tater/puzzle-mode/level-01/Floor08';
import { Floor09 } from './levels/amazing-tater/puzzle-mode/level-01/Floor09';
import { Floor10 } from './levels/amazing-tater/puzzle-mode/level-01/Floor10';
import { Level12 } from './levels/going-up/Level12';
import { PlayerDirection } from './PlayerDirection';
import { Vector2D } from './Vector2D';

import { Floor01 as Level02Floor01 } from './levels/amazing-tater/puzzle-mode/level-02/Floor01';

const keyboard: Keyboard = new Keyboard();

const soundEngine = SoundEngine.getInstance();
soundEngine.playExtendedModule(song);

export enum Sound {
    PUSH = 'push',
    BUMP = 'bump',
    FLIP = 'flip',
    FILL = 'fill',
    RESET = 'reset',
    SWITCH = 'switch',
    NEXT_LEVEL = 'next'
}

const canvas: HTMLCanvasElement = document.createElement('canvas');

canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
    'image-rendering: -moz-crisp-edges;' + // FireFox
    'image-rendering: -o-crisp-edges;' +  // Opera
    'image-rendering: -webkit-crisp-edges;' + // Chrome
    'image-rendering: crisp-edges;' + // Chrome
    'image-rendering: -webkit-optimize-contrast;' + // Safari
    'image-rendering: pixelated; ' + // Future browsers
    '-ms-interpolation-mode: nearest-neighbor;'; // IE

document.body.appendChild(canvas);

window.addEventListener('resize', resizeCanvas, false);

const context: CanvasRenderingContext2D = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;
}
resizeCanvas();

const tiles: HTMLImageElement = new Image();
tiles.src = tileImage;

const kwirk: HTMLImageElement = new Image();
kwirk.src = kwirkImage;

export const rotImage: HTMLImageElement = new Image();
rotImage.src = rot;

const all: Array<AbstractLevel> = [
    new Floor01(), new Floor02(), new Floor03(),
    new Floor04(), new Floor05(), new Floor06(),
    new Floor07(), new Floor08(), new Floor09(),
    new Floor10(), new Level02Floor01(),

    new Level1(), new Level2(), new Level3(),
    new Level4(), new Level5(), new Level6(),
    new Level7(), new Level8(), new Level9(),
    new Level10(), new Level11(), new Level12()
];

const defaultStartLevel: number = 0;
let currentLev: number = localStorage.currentLevel ?
    Math.max(Math.min(Number(localStorage.currentLevel), all.length - 1), 0) : defaultStartLevel;
const lev: AbstractLevel = all[currentLev];
let level = lev.getLevel();
let moveableObjects = lev.getEnities();
let players: Array<Player> = lev.getStartPos();

if ('vibrate' in window.navigator) {
    window.navigator.vibrate(100);
}

let currentPlayerIndex: number = 0;
function draw() {
    const aspectGame: number = (20 * 8) / (18 * 8);
    const aspectCanvas: number = canvas.width / canvas.height;
    let scale;

    if (aspectCanvas < aspectGame) {
        const newWidth = canvas.width * 1 / aspectGame;
        scale = newWidth / (18 * 8);
    } else {
        const newWidth = canvas.height * aspectGame;
        scale = newWidth / (20 * 8);
    }

    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(scale, scale);
    context.translate(-Math.floor((20 * 8) / 2), -Math.floor(18 * 8) / 2);
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, 20 * 8, 18 * 8);
    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            if (level[y][x] !== 8) {
                context.drawImage(tiles, level[y][x] * 8, 0, 8, 8, x * 8, y * 8, 8, 8);
            }
        }
    }

    moveableObjects.forEach(x => x.draw(context, (Date.now() - lastTime) * 0.006));

    // all nimations, different characters
    drawCharactersProperlyOrdered(players);

    context.setTransform(1, 0, 0, 1, 0, 0);

    context.strokeStyle = 'rgba(100,255.0,200,0.78)';

    context.beginPath();
    context.lineWidth = 6;
    context.arc(35 + 10, 35 + 10, 35, 0, 2 * Math.PI, false);  // a circle at the start
    context.stroke();

    context.beginPath();
    context.lineWidth = 6;
    context.arc(35 + 10 + 35 * 2 + 10 * 2, 35 + 10, 35, 0, 2 * Math.PI, false);  // a circle at the start
    context.stroke();

    if (touch) {
        context.strokeStyle = 'rgba(100,255.0,200,0.78)';
        context.beginPath();

        context.lineWidth = 6;
        context.arc(pos.x, pos.y, 35, 0, 2 * Math.PI, false);  // a circle at the start
        context.stroke();
        context.beginPath();
        context.lineWidth = 2;
        context.arc(pos.x, pos.y, 45, 0, 2 * Math.PI, false);  // a circle at the start

        context.stroke();

        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = 'rgba(100,255.0,200,0.78)';
        context.arc(end.x, end.y, 35, 0, 2 * Math.PI, false);  // a circle at the start

        context.stroke();

    }
}

function drawCharactersProperlyOrdered(unsortedPlayers: Array<Player>): void {
    unsortedPlayers.slice()
        .sort((a, b) => a.getY() - b.getY())
        .forEach(player => player.draw(context, lastTime, kwirk));
}

function reset() {
    lastTime = Date.now();
    const lev2 = all[currentLev];
    level = lev2.getLevel();
    moveableObjects = lev2.getEnities();
    players = lev2.getStartPos();
    currentPlayerIndex = 0;
    players[0].switchTime = Date.now();
    players[0].active = true;
    SoundEngine.getInstance().play(Sound.RESET);
}

function mySwi() {
    const currentPlayer: Player = players[currentPlayerIndex];
    currentPlayer.setOldPosition(currentPlayer);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const myNewPlyer = players[currentPlayerIndex];
    myNewPlyer.switchTime = Date.now();

    currentPlayer.active = false;
    myNewPlyer.active = true;

    SoundEngine.getInstance().play(Sound.SWITCH);
}

canvas.onclick = toggleFullScreen;

function toggleFullScreen() {
    launchIntoFullscreen(document.documentElement);
}

function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

document.addEventListener('touchstart', handleStart, false);
document.addEventListener('touchmove', handleMove, false);
document.addEventListener('touchend', handleEnd, false);

const pos = {
    x: 0,
    y: 0
};

const end = {
    x: 0,
    y: 0
};

function handleEnd(evt) {

    if (!touch) {
        return;
    }
    touch = false;
    const dir: Vector2D = new Vector2D(end.x, end.y).sub(new Vector2D(pos.x, pos.y));

    if (dir.length() < 5) {
        return;
    }

    const dist1 = new Vector2D(1, 0).dot(dir);
    const dist2 = new Vector2D(-1, 0).dot(dir);
    const dist3 = new Vector2D(0, 1).dot(dir);
    const dist4 = new Vector2D(0, -1).dot(dir);

    if (dist1 > dist2 && dist1 > dist3 && dist1 > dist4) {
        players[currentPlayerIndex].setDirection(PlayerDirection.RIGHT);
        move(1, 0);
    } else if (dist2 > dist1 && dist2 > dist3 && dist2 > dist4) {
        players[currentPlayerIndex].setDirection(PlayerDirection.LEFT);
        move(-1, 0);
    } else if (dist3 > dist2 && dist3 > dist1 && dist3 > dist4) {
        players[currentPlayerIndex].setDirection(PlayerDirection.DOWN);
        move(0, 1);
    } else {
        players[currentPlayerIndex].setDirection(PlayerDirection.TOP);
        move(0, -1);
    }
}

function handleMove(evt) {
    evt.preventDefault();

    const touches = evt.changedTouches;

    end.x = touches[0].pageX;
    end.y = touches[0].pageY;
}
let touch: boolean = false;
function handleStart(evt) {

    evt.preventDefault();

    const touches = evt.changedTouches;

    const center = new Vector2D(35 + 10, 35 + 10);
    const myPos = new Vector2D(touches[0].pageX, touches[0].pageY);
    const center2 = new Vector2D(35 + 10 + 35 * 2 + 10 * 2, 35 + 10);

    if (myPos.sub(center).length() < 35) {
        mySwi();
    } else if (myPos.sub(center2).length() < 35) {
        reset();
    } else {
        touch = true;
        pos.x = touches[0].pageX;
        pos.y = touches[0].pageY;
        end.x = touches[0].pageX;
        end.y = touches[0].pageY;
    }

}

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

    const copy = players.slice();
    copy.splice(currentPlayerIndex, 1);
    copy.forEach(player => colMap.set(player.getX(), player.getY(), 1));

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
                myNewPlayer.switchTime = Date.now();
                myNewPlayer.active = true;
                currentPlayer.active = false;
                SoundEngine.getInstance().play(Sound.SWITCH);

            } else {
                currentLev = (currentLev + 1) % all.length;
                localStorage.currentLevel = currentLev;
                const lev2 = all[currentLev];
                level = lev2.getLevel();
                moveableObjects = lev2.getEnities();
                players = lev2.getStartPos();
                currentPlayerIndex = 0;
                players.forEach(x => x.setDirection(PlayerDirection.DOWN));
                players[0].switchTime = Date.now();
                players[0].active = true;
                SoundEngine.getInstance().play(Sound.SWITCH);
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

soundEngine.loadSound(Sound.PUSH, pushSound);
soundEngine.loadSound(Sound.BUMP, bumpSound);
soundEngine.loadSound(Sound.FLIP, flipSound);
soundEngine.loadSound(Sound.FILL, fillSound);
soundEngine.loadSound(Sound.RESET, initSound);
soundEngine.loadSound(Sound.SWITCH, switchSound);
soundEngine.loadSound(Sound.NEXT_LEVEL, nextLevelSound);

players[0].switchTime = Date.now();
players[0].active = true;
SoundEngine.getInstance().play(Sound.SWITCH);

requestAnimationFrame(() => run());

function run() {
    update();
    draw();
    requestAnimationFrame(() => run());
}

let lastEventTime: number = null;
let keyPressed: boolean = false;
document.addEventListener('keydown', (event: KeyboardEvent) => {

    if (keyPressed === true) {
        return;
    }

    if (Date.now() - lastEventTime < 166) {
        keyPressed = true;
        return;
    }

    if (event.keyCode === 37) {
        keyPressed = true;
        lastEventTime = Date.now();
        players[currentPlayerIndex].setDirection(PlayerDirection.LEFT);
        move(-1, 0);
    } else if (event.keyCode === 39) {
        keyPressed = true;
        lastEventTime = Date.now();
        players[currentPlayerIndex].setDirection(PlayerDirection.RIGHT);
        move(1, 0);
    } else if (event.keyCode === 38) {
        keyPressed = true;
        lastEventTime = Date.now();
        players[currentPlayerIndex].setDirection(PlayerDirection.TOP);
        move(0, -1);
    } else if (event.keyCode === 40) {
        keyPressed = true;
        lastEventTime = Date.now();
        players[currentPlayerIndex].setDirection(PlayerDirection.DOWN);
        move(0, 1);
    }

    if (event.key === 'r') {
        reset();
    }

    if (event.key === 's') {
        mySwi();
    }

    if (event.key === 'f') {
        toggleFullScreen();
    }

});

document.addEventListener('keyup', (event: KeyboardEvent) => {
    keyPressed = false;
});

function update() {

    if (!keyPressed) {
        return;
    }

    if (Date.now() - lastEventTime > 166) {
        if (keyboard.isDown(Keyboard.LEFT)) {
            players[currentPlayerIndex].setDirection(PlayerDirection.LEFT);
            move(-1, 0);
        } else if (keyboard.isDown(Keyboard.RIGHT)) {
            players[currentPlayerIndex].setDirection(PlayerDirection.RIGHT);
            move(1, 0);
        } else if (keyboard.isDown(Keyboard.UP)) {
            players[currentPlayerIndex].setDirection(PlayerDirection.TOP);
            move(0, -1);
        } else if (keyboard.isDown(Keyboard.DOWN)) {
            players[currentPlayerIndex].setDirection(PlayerDirection.DOWN);
            move(0, 1);
        }

        lastEventTime = Date.now();
    }
}
