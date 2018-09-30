import { CollisionMap } from './CollisionMap';
import { IBlock } from './IBlock';
import { Player } from './Player';

export class BushableBlock implements IBlock {
    public x: number;
    public y: number;
    private with: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number, private rotImage: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.with = width;
        this.height = height;
    }

    // TODO: fix drawing code
    public draw(context): void {
        if (this.with === 2 && this.height === 2) {
            context.drawImage(this.rotImage, 6 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);
            context.drawImage(this.rotImage, 7 * 8, 0, 8, 8, (this.x + 1) * 8, (this.y) * 8, 8, 8);
            context.drawImage(this.rotImage, 8 * 8, 0, 8, 8, (this.x) * 8, (this.y + 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 9 * 8, 0, 8, 8, (this.x + 1) * 8, (this.y + 1) * 8, 8, 8);
        }

        if (this.with === 2 && this.height === 1) {
            context.drawImage(this.rotImage, 10 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);
            context.drawImage(this.rotImage, 11 * 8, 0, 8, 8, (this.x + 1) * 8, (this.y) * 8, 8, 8);
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

            oldPlayer.setX(newPlayer.getX());
            oldPlayer.setY(newPlayer.getY());
        }
    }

}
