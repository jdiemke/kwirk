import { IBlock } from '../blocks/IBlock';
import { PushableBlock } from '../blocks/PushableBlock';
import { rotImage } from '../index';
import { Player } from '../Player';
import { AbstractLevel } from './AbstractLevel';

export class Level4 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 3, 12, 12, 12, 8, 8, 8, 8, 8, 2, 1, 1, 1, 0, 0],
            [0, 3, 8, 8, 8, 4, 12, 12, 12, 12, 8, 8, 8, 8, 4, 8, 8, 8, 2, 0],
            [0, 3, 8, 10, 8, 8, 8, 12, 12, 12, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0],
            [0, 3, 8, 11, 8, 5, 12, 12, 12, 12, 8, 8, 8, 8, 5, 8, 8, 8, 2, 0],
            [0, 0, 0, 0, 0, 3, 12, 12, 12, 8, 8, 8, 8, 8, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        return level;
    }

    public getEnities(): Array<IBlock> {

        const moveableObjects: Array<IBlock> = [
            new PushableBlock(11, 7, 2, 3, rotImage)
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(16, 8)];
    }

}
