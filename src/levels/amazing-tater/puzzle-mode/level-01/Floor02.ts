import { IBlock } from '../../../../blocks/IBlock';
import { PushableBlock } from '../../../../blocks/PushableBlock';
import { rotImage } from '../../../../index';
import { Player } from '../../../../Player';
import { AbstractLevel } from '../../../AbstractLevel';

export class Floor02 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 0, 0, 0, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0],
            [0, 0, 8, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 8, 11, 8, 0, 0, 0, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0],
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
            new PushableBlock(8, 7, 2, 2, rotImage),
            new PushableBlock(8, 9, 2, 2, rotImage),
            new PushableBlock(10, 8, 2, 2, rotImage),
        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(15, 8)];
    }

}
