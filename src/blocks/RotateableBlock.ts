import { CollisionMap } from '../CollisionMap';
import { Player } from '../Player';
import { Vector2D } from '../Vector2D';
import { IBlock } from './IBlock';
import { RotationDirection } from './RotationDirection';

import { Sound } from '../index';
import { SoundEngine } from '../SoundEngine';
import { RotateableBlockType } from './RotateableBlockType';

export class RotatableBlock implements IBlock {

    private circle: Array<Vector2D> = [
        new Vector2D(-1, -1), new Vector2D(+0, -1), new Vector2D(+1, -1), new Vector2D(+1, +0),
        new Vector2D(+1, +1), new Vector2D(+0, +1), new Vector2D(-1, +1), new Vector2D(-1, +0)
    ];

    private tiles: Array<number>;

    private rotation: number = 0;
    private oldRotation: number = 0;
    private time: number = 0;
    private blockType: RotateableBlockType;

    constructor(private x: number, private y: number, rotate: number = 0,
                private rotImage: HTMLImageElement, type: RotateableBlockType) {
        this.blockType = type;
        this.tiles = this.getTiles(type).map((xx: number) => (xx + rotate * 2) % 8);
        this.rotation = rotate;
        this.oldRotation = this.rotation;
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

    public draw(context: CanvasRenderingContext2D, d: number): void {
        context.save();

        context.translate(this.x * 8 + 4, this.y * 8 + 4);
        const k: number = Math.max(0, Math.min((Date.now() - this.time) * 0.006, 1));
        context.rotate(Math.PI / 2 * this.inter(this.oldRotation, this.rotation, k));
        context.translate(-this.x * 8 - 4, -this.y * 8 - 4);

        if (this.blockType === RotateableBlockType.SINGLE) {
            context.drawImage(this.rotImage, 0 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);

            context.drawImage(this.rotImage, 5 * 8, 0, 8, 8, (this.x) * 8, (this.y - 1) * 8, 8, 8);
        }

        if (this.blockType === RotateableBlockType.DOUBLE_ORTHOGONAL) {
            context.drawImage(this.rotImage, 1 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);

            context.drawImage(this.rotImage, 5 * 8, 0, 8, 8, (this.x) * 8, (this.y - 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 6 * 8, 0, 8, 8, (this.x + 1) * 8, (this.y) * 8, 8, 8);
        }

        if (this.blockType === RotateableBlockType.TRIPLE) {
            context.drawImage(this.rotImage, 2 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);

            context.drawImage(this.rotImage, 5 * 8, 0, 8, 8, (this.x) * 8, (this.y - 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 7 * 8, 0, 8, 8, (this.x) * 8, (this.y + 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 6 * 8, 0, 8, 8, (this.x + 1) * 8, (this.y) * 8, 8, 8);
        }

        if (this.blockType === RotateableBlockType.QUADRUPLE) {
            context.drawImage(this.rotImage, 3 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);

            context.drawImage(this.rotImage, 5 * 8, 0, 8, 8, (this.x) * 8, (this.y - 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 7 * 8, 0, 8, 8, (this.x) * 8, (this.y + 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 6 * 8, 0, 8, 8, (this.x + 1) * 8, (this.y) * 8, 8, 8);
            context.drawImage(this.rotImage, 8 * 8, 0, 8, 8, (this.x - 1) * 8, (this.y) * 8, 8, 8);
        }

        if (this.blockType === RotateableBlockType.DOUBLE_PARALLEL) {
            context.drawImage(this.rotImage, 4 * 8, 0, 8, 8, (this.x) * 8, (this.y) * 8, 8, 8);

            context.drawImage(this.rotImage, 5 * 8, 0, 8, 8, (this.x) * 8, (this.y - 1) * 8, 8, 8);
            context.drawImage(this.rotImage, 7 * 8, 0, 8, 8, (this.x) * 8, (this.y + 1) * 8, 8, 8);
        }

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
        map.set(this.x, this.y, 1);

        for (let i = 0; i < this.tiles.length; i++) {
            map.set(this.circle[this.tiles[i]].x + this.x, this.circle[this.tiles[i]].y + this.y, 1);
        }
    }

    // tslint:disable-next-line:no-empty
    public handleCollision(oldPlayer: Player, newPlayer: Player, map: CollisionMap,
                           level: Array<Array<number>>, time: number): boolean {
        this.time = time;
        const oldDir: Vector2D = new Vector2D(oldPlayer.getX() - this.x, oldPlayer.getY() - this.y);
        const newDir: Vector2D = new Vector2D(newPlayer.getX() - this.x, newPlayer.getY() - this.y);

        const direction: RotationDirection = oldDir.determienRotationDirectionTo(newDir);

        if (direction === RotationDirection.PARALLEL) {
            this.oldRotation = this.rotation;
            SoundEngine.getInstance().play(Sound.BUMP);
            return;
        }

        if (direction === RotationDirection.CW) {
            for (let i = 0; i < this.tiles.length; i++) {
                for (let off = 1; off <= 2; off++) {
                    // tslint:disable-next-line:max-line-length
                    if (map.get(this.circle[(this.tiles[i] + off) % 8].x + this.x, this.circle[(this.tiles[i] + off) % 8].y + this.y)) {
                        this.oldRotation = this.rotation;
                        SoundEngine.getInstance().play(Sound.BUMP);
                        return;
                    }
                }
            }
            this.tiles = this.tiles.map((x: number) => (x + 2) % 8);

            this.rotation = (this.rotation + 1) % 4;
            this.oldRotation = this.rotation - 1;
        }

        if (direction === RotationDirection.CCW) {
            for (let i = 0; i < this.tiles.length; i++) {
                for (let off = 1; off <= 2; off++) {
                    // tslint:disable-next-line:max-line-length
                    if (map.get(this.circle[(this.tiles[i] - off + 8) % 8].x + this.x, this.circle[(this.tiles[i] - off + 8) % 8].y + this.y)) {
                        this.oldRotation = this.rotation;
                        SoundEngine.getInstance().play(Sound.BUMP);
                        return;
                    }
                }
            }
            this.tiles = this.tiles.map((x: number) => (x + 6) % 8);

            this.rotation = (this.rotation - 1 + 4) % 4;
            this.oldRotation = this.rotation + 1;
        }

        if (this.collides(newPlayer.getX(), newPlayer.getY())) {
            const dx: number = newPlayer.getX() - oldPlayer.getX();
            const dy: number = newPlayer.getY() - oldPlayer.getY();
            newPlayer.setX(newPlayer.getX() + dx);
            newPlayer.setY(newPlayer.getY() + dy);
        }
        oldPlayer.setX(newPlayer.getX());
        oldPlayer.setY(newPlayer.getY());

        SoundEngine.getInstance().play(Sound.FLIP);
        return false;
    }

    private getTiles(type: RotateableBlockType): Array<number> {
        switch (type) {
            case RotateableBlockType.SINGLE:
                return [1];
            case RotateableBlockType.DOUBLE_ORTHOGONAL:
                return [1, 3];
            case RotateableBlockType.TRIPLE:
                return [1, 3, 5];
            case RotateableBlockType.QUADRUPLE:
                return [1, 3, 5, 7];
            case RotateableBlockType.DOUBLE_PARALLEL:
                return [1, 5];
        }
    }

}
