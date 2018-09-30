import { CollisionMap } from './CollisionMap';
import { IBlock } from './IBlock';
import { Player } from './Player';
import { RotationDirection } from './RotationDirection';
import { Vector2D } from './Vector2D';

export class RotatableBlock implements IBlock {

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

    constructor(private x: number, private y: number, rotate: number = 0, private rotImage: HTMLImageElement) {
        this.tiles = [
            1, 7,
            5
        ];

        this.tiles = this.tiles.map((xx: number) => (xx + rotate * 2) % 8);
        this.rotation = rotate;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save();

        context.translate(this.x * 8 + 4, this.y * 8 + 4);
        context.rotate(Math.PI / 2 * this.rotation);
        context.translate(-this.x * 8 - 4, -this.y * 8 - 4);

        context.drawImage(this.rotImage, 0 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);
        context.drawImage(this.rotImage, 1 * 8, 0, 8, 8, (this.x) * 8, (this.y - 1) * 8, 8, 8);
        context.drawImage(this.rotImage, 3 * 8, 0, 8, 8, (this.x) * 8, (this.y + 1) * 8, 8, 8);
        context.drawImage(this.rotImage, 4 * 8, 0, 8, 8, (this.x - 1) * 8, (this.y) * 8, 8, 8);

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
        oldPlayer.setX(newPlayer.getX());
        oldPlayer.setY(newPlayer.getY());
    }

}