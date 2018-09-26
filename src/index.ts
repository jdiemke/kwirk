const canvas: HTMLCanvasElement = document.createElement('canvas');

canvas.width = 356;
canvas.height = 224;

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

const level: Array<Array<number>> = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

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

// tslint:disable-next-line:max-classes-per-file
class MovableTile {
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
                context.fillRect(this.x * 16 + x * 16, this.y * 16 + y * 16, 16, 16);
            }
        }
    }

    public collides(xx: number, yy: number) {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.with; x++) {
                if ((this.x + x) === xx && (this.y + y) === yy) {
                    return true;
                }
            }
        }
        return false;
    }

    public move(xx: number, yy: number, col: CollisionMap) {
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

}

const moveableObjects: Array<MovableTile> = [
    new MovableTile(2, 2, 2, 2),
    new MovableTile(6, 2, 1, 2)
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

const player = new Player(15, 2);

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
            if (level[y][x] === 1) {
                context.fillStyle = '#ff4444';
            } else if (level[y][x] === 0) {
                context.fillStyle = '#44ff44';
            } else if (level[y][x] === 2) {
                context.fillStyle = '#4444ff';
            } else if (level[y][x] === 3) {
                context.fillStyle = '#0033ff';
            }

            context.fillRect(x * 16, y * 16, 16, 16);
        }
    }

    context.fillStyle = '#ff44ff';
    context.fillRect(player.getX() * 16, player.getY() * 16, 16, 16);

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

function move(dx: number, dy: number): void {

    const newPlayer: Player = new Player(player.getX() + dx, player.getY() + dy);

    const colMap: CollisionMap = new CollisionMap(level[0].length, level.length);

    for (let y: number = 0; y < level.length; y++) {
        for (let x: number = 0; x < level[y].length; x++) {
            colMap.set(x, y, level[y][x] === 1);
        }
    }

    if (colMap.get(newPlayer.getX(), newPlayer.getY())) {
        // if the potential position is not walkable return
        return;
    }

    const collistion: MovableTile = moveableObjects.find((x: MovableTile) => {
        return x.collides(newPlayer.getX(), newPlayer.getY());
    });

    // no collisiton
    if (collistion === undefined) {
        player.setX(newPlayer.getX());
        player.setY(newPlayer.getY());
        return;
    }

    const other: Array<MovableTile> = moveableObjects.filter((x: MovableTile) => {
        return x !== collistion;
    });

    // fill collisiton map with all obstacles that we did not collide with
    other.forEach((x) => {
        x.fill(colMap);
    });

    // collision case: check whether obstacle can be moved according to the players movement
    if (collistion.move(dx, dy, colMap)) {
        collistion.x += dx;
        collistion.y += dy;

        // TODO: check whether collistion has to be converted into floor tiles

        player.setX(newPlayer.getX());
        player.setY(newPlayer.getY());
    }
}
