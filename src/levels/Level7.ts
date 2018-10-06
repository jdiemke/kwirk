import { IBlock } from '../blocks/IBlock';
import { PushableBlock } from '../blocks/PushableBlock';
import { RotatableBlock } from '../blocks/RotateableBlock';
import { RotateableBlockType } from '../blocks/RotateableBlockType';
import { rotImage } from '../index';
import { Player } from '../Player';
import { AbstractLevel } from './AbstractLevel';

export class Level7 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 8, 8, 8, 8, 8, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
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
            new RotatableBlock(7, 8, 0, rotImage, RotateableBlockType.QUADRUPLE),
            new RotatableBlock(8, 6, 0, rotImage, RotateableBlockType.DOUBLE_PARALLEL),
            new RotatableBlock(8, 10, 0, rotImage, RotateableBlockType.DOUBLE_PARALLEL),
            new RotatableBlock(10, 8, 3, rotImage, RotateableBlockType.SINGLE),
            new RotatableBlock(10, 6, 3, rotImage, RotateableBlockType.SINGLE),
            new RotatableBlock(10, 10, 3, rotImage, RotateableBlockType.SINGLE)
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(14, 8)];
    }

}
