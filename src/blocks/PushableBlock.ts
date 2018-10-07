import { CollisionMap } from '../CollisionMap';
import { Sound } from '../index';
import { Player } from '../Player';
import { SoundEngine } from '../SoundEngine';
import { IBlock } from './IBlock';

export class PushableBlock implements IBlock {
    public x: number;
    public y: number;
    private with: number;
    private height: number;

    private time: number = 0;
    private oldX: number;
    private oldY: number;

    constructor(x: number, y: number, width: number, height: number, private rotImage: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.with = width;
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

    // TODO: fix drawing code
    public draw(context): void {
        const k: number = Math.max(0, Math.min((Date.now() - this.time) * 0.006, 1));
        const x: number = this.inter(this.oldX, this.x, k);
        const y: number = this.inter(this.oldY, this.y, k);

        if (this.with === 1 && this.height === 1) {
            context.drawImage(this.rotImage, 17 * 8, 0, 8, 8, (x) * 8, (y) * 8, 8, 8);

        } else if (this.with === 2 && this.height === 2) {
            context.drawImage(this.rotImage, 9 * 8, 0, 8, 8, (x) * 8, (y) * 8, 8, 8);
            context.drawImage(this.rotImage, 10 * 8, 0, 8, 8, (x + 1) * 8, (y) * 8, 8, 8);
            context.drawImage(this.rotImage, 11 * 8, 0, 8, 8, (x) * 8, (y + 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 12 * 8, 0, 8, 8, (x + 1) * 8, (y + 1) * 8, 8, 8);
        } else if (this.with === 2 && this.height === 3) {
            context.drawImage(this.rotImage, 9 * 8, 0, 8, 8, (x) * 8, (y) * 8, 8, 8);
            context.drawImage(this.rotImage, 10 * 8, 0, 8, 8, (x + 1) * 8, (y) * 8, 8, 8);
            context.drawImage(this.rotImage, 15 * 8, 0, 8, 8, (x) * 8, (y + 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 16 * 8, 0, 8, 8, (x + 1) * 8, (y + 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 11 * 8, 0, 8, 8, (x) * 8, (y + 2) * 8, 8, 8);
            context.drawImage(this.rotImage, 12 * 8, 0, 8, 8, (x + 1) * 8, (y + 2) * 8, 8, 8);
        } else if (this.with === 2 && this.height === 1) {
            context.drawImage(this.rotImage, 13 * 8, 0, 8, 8, (x) * 8, (y) * 8, 8, 8);
            context.drawImage(this.rotImage, 14 * 8, 0, 8, 8, (x + 1) * 8, (y) * 8, 8, 8);
        } else if (this.with === 1) {
            // 19, 20, 21
            for (let yy: number = 0; yy < this.height; yy++) {
                let index: number;
                if (yy === 0) {
                    index = 19;
                } else if (yy === (this.height - 1)) {
                    index = 20;
                } else {
                    index = 21;
                }
                context.drawImage(this.rotImage, index * 8, 0, 8, 8, x * 8, (y + yy) * 8, 8, 8);
            }
        } else {
            for (let yy: number = 0; yy < this.height; yy++) {
                for (let xx: number = 0; xx < this.with; xx++) {
                    context.drawImage(this.rotImage, 20 * 8, 0, 8, 8, (x + xx) * 8, (y + yy) * 8, 8, 8);
                }
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
                if (col.get(this.x + x + xx, this.y + y + yy) === 1) {
                    return false;
                }
            }
        }
        return true;
    }

    public fill(map: CollisionMap): void {
        for (let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.with; x++) {
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
                    for (let x: number = 0; x < this.with; x++) {
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
            for (let x: number = 0; x < this.with; x++) {
                if (map.get((this.x + x), (this.y + y)) === 0) {
                    return false;
                }
            }
        }
        return true;
    }

}
