import { IBlock } from '../blocks/IBlock';
import { PushableBlock } from '../blocks/PushableBlock';
import { RotatableBlock } from '../blocks/RotateableBlock';
import { RotateableBlockType } from '../blocks/RotateableBlockType';
import { rotImage } from '../index';
import { Player } from '../Player';
import { AbstractLevel } from './AbstractLevel';

export class Level12 extends AbstractLevel {

    public getLevel(): Array<Array<number>> {
        const level: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0],
            [0, 0, 0, 0, 0, 8, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 0, 12, 8, 8, 0, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 8, 8, 0, 8, 0, 8, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 8, 8, 12, 8, 0, 12, 12, 8, 8, 8, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 12, 12, 12, 8,  8, 0, 12, 8, 0, 8, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 8, 0, 12, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 12, 12,  8, 12, 8, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 12, 12, 12,  8, 0, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 8, 8, 8, 0, 12, 12, 12, 12, 0, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 10, 8, 8, 0, 12, 12, 12, 12, 0, 8, 8, 8, 0, 8, 0, 0, 0],
            [0, 0, 8, 11, 8, 8, 8, 8, 12, 12, 12, 0, 8, 8, 8, 8, 8, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        return level;
    }

    public getEnities(): Array<IBlock> {
        const moveableObjects: Array<IBlock> = [
            new PushableBlock(3, 5, 3, 1, rotImage),
            new PushableBlock(8, 3, 1, 1, rotImage),
            new PushableBlock(12, 1, 1, 1, rotImage),
            new PushableBlock(12, 7, 3, 1, rotImage),
            new PushableBlock(3, 7, 1, 3, rotImage),
            new PushableBlock(4, 7, 1, 2, rotImage),
            new PushableBlock(13, 12, 1, 4, rotImage),
            new RotatableBlock(9, 3, 0, rotImage, RotateableBlockType.TRIPLE)
        ];

        return moveableObjects;
    }

    public getStartPos(): Array<Player> {
        return [
            new Player(3, 1),
        ];
    }

}
