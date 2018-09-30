import { CollisionMap } from './CollisionMap';
import { Player } from './Player';

export interface IBlock {
    draw(context: CanvasRenderingContext2D): void;
    collides(xx: number, yy: number): boolean;
    fill(map: CollisionMap): void;
    handleCollision(oldPlayer: Player, newPlayer: Player, map: CollisionMap): void;
}
