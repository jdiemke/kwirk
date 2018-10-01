import { BushableBlock } from '../BushableBlock';
import { IBlock } from '../IBlock';
import { rotImage } from '../index';
import { Player } from '../Player';
import { RotatableBlock } from '../RotateableBlock';
import { RotatableBlock3 } from '../RotateableBlock3';
import { AbstractLevel } from './AbstractLevel';

export class Level5 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 3, 8, 8, 8, 8, 8, 8, 2, 1, 1, 1, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 2, 0, 0],
            [0, 0, 3, 8, 10, 8, 12, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0],
            [0, 0, 3, 8, 11, 8, 5, 8, 8, 8, 8, 8, 8, 5, 8, 8, 8, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0, 0, 0, 0],
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
            new BushableBlock(10, 8, 1, 1, rotImage),
            new RotatableBlock3(9, 8, 0, rotImage)
        ];
        return moveableObjects;
    }

    public getStartPos(): Player {
        return new Player(16, 8);
    }

}
