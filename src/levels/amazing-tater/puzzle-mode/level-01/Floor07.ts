import { IBlock } from '../../../../blocks/IBlock';
import { PushableBlock } from '../../../../blocks/PushableBlock';
import { RotatableBlock } from '../../../../blocks/RotateableBlock';
import { RotateableBlockType } from '../../../../blocks/RotateableBlockType';
import { rotImage } from '../../../../index';
import { Player } from '../../../../Player';
import { AbstractLevel } from '../../../AbstractLevel';

export class Floor07 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 8, 8, 8, 0, 0, 12, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0],
            [0, 0, 0, 8, 10, 8, 8, 8, 12, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0],
            [0, 0, 0, 8, 11, 8, 0, 0, 8, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0],
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
            new PushableBlock(9, 7, 1, 1, rotImage),
            new PushableBlock(10, 8, 1, 1, rotImage),
            new PushableBlock(10, 10, 1, 1, rotImage),
            new RotatableBlock(9, 9, 2, rotImage, RotateableBlockType.TRIPLE)
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(14, 9)];
    }

}
