import { IBlock } from '../IBlock';
import { rotImage } from '../index';
import { Player } from '../Player';
import { PushableBlock } from '../PushableBlock';
import { RotatableBlock2 } from '../RotateableBlock2';
import { AbstractLevel } from './AbstractLevel';

export class Level3 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3, 8, 8, 8, 8, 4, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3, 8, 8, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 3, 8, 8, 8, 8, 5, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 0, 3, 8, 8, 8, 4, 8, 8, 8, 8, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 8, 10, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 8, 11, 8, 5, 8, 8, 8, 8, 2, 0, 0, 0, 0, 0, 0, 0],
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
        return [
            new PushableBlock(10, 8, 2, 2, rotImage),
            new RotatableBlock2(8, 9, 0, rotImage)
        ];
    }

    public getStartPos(): Player {
        return new Player(15, 7);
    }

}
