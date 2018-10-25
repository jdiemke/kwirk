import { IBlock } from '../../../../blocks/IBlock';
import { PushableBlock } from '../../../../blocks/PushableBlock';
import { RotatableBlock } from '../../../../blocks/RotateableBlock';
import { RotateableBlockType } from '../../../../blocks/RotateableBlockType';
import { rotImage } from '../../../../index';
import { Player } from '../../../../Player';
import { AbstractLevel } from '../../../AbstractLevel';

export class Floor09 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 10, 0, 0, 0, 0, 0, 0, 0],
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
           new RotatableBlock(9, 5, 2, rotImage, RotateableBlockType.SINGLE),
           new RotatableBlock(8, 7, 2, rotImage, RotateableBlockType.TRIPLE),
           new RotatableBlock(11, 7, 3, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
           new RotatableBlock(13, 8, 3, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),

           new RotatableBlock(5, 9, 1, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
           new RotatableBlock(9, 9, 2, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
           new RotatableBlock(11, 9, 0, rotImage, RotateableBlockType.TRIPLE),
           new RotatableBlock(7, 11, 0, rotImage, RotateableBlockType.QUADRUPLE),
           new RotatableBlock(10, 11, 0, rotImage, RotateableBlockType.QUADRUPLE),
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(9, 12)];
    }

}
