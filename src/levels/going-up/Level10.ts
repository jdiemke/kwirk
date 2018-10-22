import { IBlock } from '../../blocks/IBlock';
import { RotatableBlock } from '../../blocks/RotateableBlock';
import { RotateableBlockType } from '../../blocks/RotateableBlockType';
import { rotImage } from '../../index';
// tslint:disable-next-line:ordered-imports
import { PushableBlock } from '../../blocks/PushableBlock';
import { Player } from '../../Player';
import { AbstractLevel } from '../AbstractLevel';

export class Level10 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 0, 8, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 0, 8, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
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
            new RotatableBlock(8, 7, 3, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
            new RotatableBlock(10, 7, 0, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
            new RotatableBlock(9, 8, 2, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
            new RotatableBlock(11, 9, 0, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
            new RotatableBlock(8, 10, 2, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
            new RotatableBlock(10, 10, 1, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL)
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [
            new Player(15, 7),
            new Player(15, 10)
        ];
    }

}
