import { IBlock } from '../blocks/IBlock';
import { RotatableBlock } from '../blocks/RotateableBlock';
import { RotateableBlockType } from '../blocks/RotateableBlockType';
import { rotImage } from '../index';
// tslint:disable-next-line:ordered-imports
import { PushableBlock } from '../blocks/PushableBlock';
import { Player } from '../Player';
import { AbstractLevel } from './AbstractLevel';

export class Level9 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 0, 0],
            [0, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 0, 0],
            [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
            [0, 8, 8, 8, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
            [0, 8, 8, 8, 11, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
            [0, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 0, 0],
            [0, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 0, 0],
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
            new PushableBlock(9, 5, 1, 1, rotImage),
            new PushableBlock(9, 11, 1, 1, rotImage),
            new PushableBlock(11, 7, 1, 1, rotImage),
            new PushableBlock(11, 8, 1, 1, rotImage),
            new PushableBlock(11, 9, 1, 1, rotImage),
            new RotatableBlock(7, 8, 0, rotImage, RotateableBlockType.DOUBLE_PARALLEL),
            new RotatableBlock(9, 7, 3, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
            new RotatableBlock(9, 9, 2, rotImage, RotateableBlockType.DOUBLE_ORTHOGONAL),
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(14, 8)];
    }

}
