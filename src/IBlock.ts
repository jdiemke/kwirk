import { CollisionMap } from './CollisionMap';
import { Player } from './Player';

export interface IBlock {
    draw(context: CanvasRenderingContext2D, time: number): void;
    collides(xx: number, yy: number): boolean;
    fill(map: CollisionMap): void;
    handleCollision(oldPlayer: Player, newPlayer: Player, map: CollisionMap,
                    level: Array<Array<number>>, time: number): boolean;
}
