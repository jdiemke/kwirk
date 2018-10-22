import { IBlock } from '../../../../blocks/IBlock';
import { PushableBlock } from '../../../../blocks/PushableBlock';
import { RotatableBlock } from '../../../../blocks/RotateableBlock';
import { RotateableBlockType } from '../../../../blocks/RotateableBlockType';
import { rotImage } from '../../../../index';
import { Player } from '../../../../Player';
import { AbstractLevel } from '../../../AbstractLevel';

export class Floor04 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 10, 12, 12, 12, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 11, 12, 12, 12, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
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
            new PushableBlock(11, 6, 2, 1, rotImage),
            new PushableBlock(11, 7, 2, 2, rotImage),
            new PushableBlock(10, 9, 3, 2, rotImage),

        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(14, 8)];
    }

}
