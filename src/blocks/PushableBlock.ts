import { CollisionMap } from '../CollisionMap';
import { Sound } from '../index';
import { Player } from '../Player';
import { SoundEngine } from '../SoundEngine';
import { IBlock } from './IBlock';

export class PushableBlock implements IBlock {
    public x: number;
    public y: number;
    private width: number;
    private height: number;

    private time: number = 0;
    private oldX: number;
    private oldY: number;

    constructor(x: number, y: number, width: number, height: number, private rotImage: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.width = width;
        this.height = height;
    }

    public inter(a, b, val): number {
        if (val < 0) {
            return a;
        }

        if (val > 1) {
            return b;
        }

        return (b - a) * val + a;
    }

    public draw1x1Block(context, x: number, y: number): void {
        context.drawImage(this.rotImage, 17 * 8, 0, 8, 8, (x) * 8, (y) * 8, 8, 8);
    }

    public draw1xNBlock(context, x: number, y: number, tiles: Array<number> = [19, 21, 20]): void {
        for (let yy: number = 0; yy < this.height; yy++) {
            let index: number;
            if (yy === 0) {
                index = tiles[0];
            } else if (yy === (this.height - 1)) {
                index = tiles[2];
            } else {
                index = tiles[1];
            }
            context.drawImage(this.rotImage, index * 8, 0, 8, 8, x * 8, (y + yy) * 8, 8, 8);
        }
    }

    public drawNxNBlock(context, x: number, y: number): void {
        for (let yy: number = 0; yy < this.height; yy++) {
            if (yy === 0) {
                this.drawNx1Block(context, x, y + yy, [9, 24, 10]);
            } else if (yy === (this.height - 1)) {
                this.drawNx1Block(context, x, y + yy, [11, 23, 12]);
            } else {
                this.drawNx1Block(context, x, y + yy, [15, 25, 16]);
            }
        }
    }

    public drawNx1Block(context, x: number, y: number, tiles: Array<number> = [13, 22, 14]): void {
        for (let xx: number = 0; xx < this.width; xx++) {
            let index: number;
            if (xx === 0) {
                index = tiles[0];
            } else if (xx === (this.width - 1)) {
                index = tiles[2];
            } else {
                index = tiles[1];
            }
            context.drawImage(this.rotImage, index * 8, 0, 8, 8, (x + xx) * 8, (y) * 8, 8, 8);
        }
    }

    public draw(context): void {
        const k: number = Math.max(0, Math.min((Date.now() - this.time) * 0.006, 1));

        const x: number = this.inter(this.oldX, this.x, k);
        const y: number = this.inter(this.oldY, this.y, k);

        if (this.width === 1 && this.height === 1) {
            this.draw1x1Block(context, x, y);
        } else if (this.width === 1) {
            this.draw1xNBlock(context, x, y);
        } else if (this.height === 1) {
            this.drawNx1Block(context, x, y);
        } else {
            this.drawNxNBlock(context, x, y);
        }
    }

    public collides(xx: number, yy: number): boolean {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                if ((this.x + x) === xx && (this.y + y) === yy) {
                    return true;
                }
            }
        }
        return false;
    }

    public isMovable(xx: number, yy: number, col: CollisionMap) {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                if (col.get(this.x + x + xx, this.y + y + yy) === 1) {
                    return false;
                }
            }
        }
        return true;
    }

    public fill(map: CollisionMap): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                map.set((this.x + x), (this.y + y), 1);
            }
        }
    }

    public handleCollision(oldPlayer: Player,
                           newPlayer: Player, map: CollisionMap, level: Array<Array<number>>,
                           time: number): boolean {

        this.time = time;
        // collision case: check whether obstacle can be moved according to the players movement
        const dx: number = newPlayer.getX() - oldPlayer.getX();
        const dy: number = newPlayer.getY() - oldPlayer.getY();

        this.oldX = this.x;
        this.oldY = this.y;
        if (this.isMovable(dx, dy, map)) {
            SoundEngine.getInstance().play(Sound.PUSH);
            this.oldX = this.x;
            this.oldY = this.y;
            this.x += dx;
            this.y += dy;

            // TODO: check whether collistion has to be converted into floor tiles
            if (this.onEmptySpace(map)) {
                for (let y: number = 0; y < this.height; y++) {
                    for (let x: number = 0; x < this.width; x++) {
                        level[y + this.y][x + this.x] = 8;
                    }
                }
                oldPlayer.setX(newPlayer.getX());
                oldPlayer.setY(newPlayer.getY());
                SoundEngine.getInstance().play(Sound.FILL);
                return true;
            }

            oldPlayer.setX(newPlayer.getX());
            oldPlayer.setY(newPlayer.getY());
            return false;
        } else {
            SoundEngine.getInstance().play(Sound.BUMP);
        }
    }

    public onEmptySpace(map: CollisionMap): boolean {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                if (map.get((this.x + x), (this.y + y)) === 0) {
                    return false;
                }
            }
        }
        return true;
    }

}
