import 'jsxm/xm';
import 'jsxm/xmeffects';
import song from './dalezy_-_tu_page.xm';
import tileImage from './tiles.png';

import rot from './rotating.png';

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

canvas.style.width = `${canvas.width * 2}px`;
canvas.style.height = `${canvas.height * 2}px`;

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

class CollisionMap {

    private map: Array<boolean>;

    constructor(private width: number, private height: number) {
        this.map = new Array<boolean>(width * height);
    }

    public set(x: number, y: number, blocked: boolean): void {
        this.map[y * this.width + x] = blocked;
    }

    public get(x: number, y: number): boolean {
        return this.map[y * this.width + x];
    }

}

interface IBlock {
    draw(): void;
    collides(xx: number, yy: number): boolean;
    fill(map: CollisionMap): void;
    handleCollision(oldPlayer: Player, newPlayer: Player, map: CollisionMap): void;
}
// tslint:disable-next-line:max-classes-per-file
class Vector2D {
    constructor(public x: number, public y: number) {

    }

    /**
     * https://math.stackexchange.com/questions/74307/two-2d-vector-angle-clockwise-predicate
     *
     * @param vector
     */
    public determienRotationDirectionTo(vector: Vector2D): RotationDirection {
        const cz = this.x * vector.y - this.y * vector.x;

        if (cz > 0) {
            return RotationDirection.CW;
        } else if (cz < 0) {
            return RotationDirection.CCW;
        } else {
            return RotationDirection.PARALLEL;
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
class RotatableBlock implements IBlock {

    private circle: Array<Vector2D> = [
        new Vector2D(-1, - 1),
        new Vector2D(0, - 1),
        new Vector2D(1, - 1),
        new Vector2D(1, 0),
        new Vector2D(1, 1),
        new Vector2D(0, 1),
        new Vector2D(- 1, 1),
        new Vector2D(- 1, 0),
    ];
    private tiles: Array<number>;

    private rotation: number = 0;
    constructor(private x: number, private y: number, rotate: number = 0) {
        this.tiles = [
            1, 7,
            5
        ];

        this.tiles = this.tiles.map((xx: number) => (xx + rotate * 2) % 8);
        this.rotation = rotate;
    }

    public draw(): void {
        context.save();
        context.translate(this.x * 8 + 4, this.y * 8 + 4);

        // Rotate 1 degree
        context.rotate(Math.PI / 2 * this.rotation);

        // Move registration point back to the top left corner of canvas
        context.translate(-this.x * 8 - 4, -this.y * 8 - 4);
        context.fillStyle = '#0000ff';
        context.drawImage(rotImage, 0 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);

        context.drawImage(rotImage, 1 * 8, 0, 8, 8, (+ this.x) * 8, (this.y - 1) * 8, 8, 8);
        context.drawImage(rotImage, 3 * 8, 0, 8, 8, (+ this.x) * 8, (this.y + 1) * 8, 8, 8);
        context.drawImage(rotImage, 4 * 8, 0, 8, 8, (this.x - 1) * 8, (this.y) * 8, 8, 8);

        context.restore();
    }
    public collides(xx: number, yy: number): boolean {
        if (xx === this.x && yy === this.y) {
            return true;
        }
        for (let i = 0; i < this.tiles.length; i++) {
            if ((this.x + this.circle[this.tiles[i]].x) === xx && (this.y + this.circle[this.tiles[i]].y) === yy) {
                return true;
            }
        }
        return false;
    }

    public fill(map: CollisionMap): void {
        for (let i = 0; i < this.tiles.length; i++) {
            map.set(this.circle[this.tiles[i]].x + this.x, this.circle[this.tiles[i]].y + this.y, true);
        }
    }

    // tslint:disable-next-line:no-empty
    public handleCollision(oldPlayer: Player, newPlayer: Player, map: CollisionMap): void {
        const oldDir: Vector2D = new Vector2D(oldPlayer.getX() - this.x, oldPlayer.getY() - this.y);
        const newDir: Vector2D = new Vector2D(newPlayer.getX() - this.x, newPlayer.getY() - this.y);

        const direction: RotationDirection = oldDir.determienRotationDirectionTo(newDir);
        console.warn(RotationDirection[direction]);

        if (direction === RotationDirection.PARALLEL) {
            return;
        }

        if (direction === RotationDirection.CW) {
            for (let i = 0; i < this.tiles.length; i++) {
                for (let off = 1; off <= 2; off++) {
                    // tslint:disable-next-line:max-line-length
                    if (map.get(this.circle[(this.tiles[i] + off) % 8].x + this.x, this.circle[(this.tiles[i] + off) % 8].y + this.y)) {
                        return;
                    }
                }
            }
            this.tiles = this.tiles.map((x: number) => (x + 2) % 8);
            this.rotation = (this.rotation + 1) % 4;
        }

        if (direction === RotationDirection.CCW) {
            for (let i = 0; i < this.tiles.length; i++) {
                for (let off = 1; off <= 2; off++) {
                    // tslint:disable-next-line:max-line-length
                    if (map.get(this.circle[(this.tiles[i] - off + 8) % 8].x + this.x, this.circle[(this.tiles[i] - off + 8) % 8].y + this.y)) {
                        return;
                    }
                }
            }
            this.tiles = this.tiles.map((x: number) => (x + 6) % 8);
            this.rotation = (this.rotation - 1 + 4) % 4;
        }

        if (this.collides(newPlayer.getX(), newPlayer.getY())) {
            const dx: number = newPlayer.getX() - oldPlayer.getX();
            const dy: number = newPlayer.getY() - oldPlayer.getY();
            newPlayer.setX(newPlayer.getX() + dx);
            newPlayer.setY(newPlayer.getY() + dy);
        }
        player.setX(newPlayer.getX());
        player.setY(newPlayer.getY());
    }

}

// tslint:disable-next-line:max-classes-per-file
class BushableBlock implements IBlock {
    public x: number;
    public y: number;
    private with: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.with = width;
        this.height = height;
    }

    public draw(): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.with; x++) {
                context.fillStyle = '#0000ff';
                context.fillRect(this.x * 8 + x * 8, this.y * 8 + y * 8, 8, 8);
            }
        }
    }

    public collides(xx: number, yy: number): boolean {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.with; x++) {
                if ((this.x + x) === xx && (this.y + y) === yy) {
                    return true;
                }
            }
        }
        return false;
    }

    public isMovable(xx: number, yy: number, col: CollisionMap) {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.with; x++) {
                if (col.get(this.x + x + xx, this.y + y + yy)) {
                    return false;
                }
            }
        }
        return true;
    }

    public fill(map: CollisionMap): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.with; x++) {
                map.set((this.x + x), (this.y + y), true);
            }
        }
    }

    public handleCollision(oldPlayer: Player, newPlayer: Player, map: CollisionMap): void {
        // collision case: check whether obstacle can be moved according to the players movement
        const dx: number = newPlayer.getX() - oldPlayer.getX();
        const dy: number = newPlayer.getY() - oldPlayer.getY();

        if (this.isMovable(dx, dy, map)) {
            this.x += dx;
            this.y += dy;

            // TODO: check whether collistion has to be converted into floor tiles

            player.setX(newPlayer.getX());
            player.setY(newPlayer.getY());
        }
    }

}

const moveableObjects: Array<IBlock> = [
    new RotatableBlock(7, 8, 2),
    new RotatableBlock(12, 8, 0)
];

// tslint:disable-next-line:max-classes-per-file
class Player {
    constructor(private x: number, private y: number) {

    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

}

const player = new Player(16, 8);

// tslint:disable-next-line:max-classes-per-file
class Obstacle {

    private pos = {
        x: 5,
        y: 1,
    };

    private space = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ];

    // tiles that have to be free in order to rotate clockwise
    private check = [
        [0, 0, 1],
        [1, 0, 1],
        [1, 0, 0],
    ];

    public draw(): void {
        for (let y: number = 0; y < this.space.length; y++) {
            for (let x: number = 0; x < this.space[y].length; x++) {

                if (this.space[y][x] === 1) {
                    context.fillStyle = '#0033ff';

                    context.fillRect((this.pos.x + x) * 16, (this.pos.y + y) * 16, 16, 16);
                }
            }
        }
    }
}

const obst = new Obstacle();

function draw() {
    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            context.drawImage(tiles, level[y][x] * 8, 0, 8, 8, x * 8, y * 8, 8, 8);
        }
    }

    context.fillStyle = '#ff44ff';
    context.fillRect(player.getX() * 8, player.getY() * 8, 8, 8);

    //  obst.draw();

    moveableObjects.forEach((x) => x.draw());

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

enum RotationDirection {
    CCW,
    CW,
    PARALLEL
}

function move(dx: number, dy: number): void {

    const newPlayer: Player = new Player(player.getX() + dx, player.getY() + dy);

    const colMap: CollisionMap = new CollisionMap(level[0].length, level.length);

    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            colMap.set(x, y, level[y][x] !== 8 && level[y][x] !== 9);
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
