import { IBlock } from '../blocks/IBlock';
import { PushableBlock } from '../blocks/PushableBlock';
import { RotatableBlock } from '../blocks/RotateableBlock';
import { RotateableBlockType } from '../blocks/RotateableBlockType';
import { rotImage } from '../index';
import { Player } from '../Player';
import { AbstractLevel } from './AbstractLevel';

export class Level6 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 5, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 5, 8, 4, 8, 4, 8, 5, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 4, 8, 8, 8, 8, 8, 4, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 8, 8, 12, 8, 8, 4, 8, 8, 8, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 10, 8, 5, 8, 8, 8, 8, 8, 5, 8, 8, 8, 2, 0, 0, 0],
            [0, 0, 3, 8, 11, 8, 5, 8, 5, 8, 5, 8, 5, 8, 8, 8, 2, 0, 0, 0],
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
            new PushableBlock(12, 8, 1, 1, rotImage)

        ];
        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [new Player(14, 7), new Player(14, 9)];
    }

}
