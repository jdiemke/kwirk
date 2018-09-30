import { CollisionMap } from './CollisionMap';
import { IBlock } from './IBlock';
import { Player } from './Player';

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

    public draw(context): void {
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

            oldPlayer.setX(newPlayer.getX());
            oldPlayer.setY(newPlayer.getY());
        }
    }

}
