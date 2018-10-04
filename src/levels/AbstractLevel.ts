import { IBlock } from '../blocks/IBlock';
import { Player } from '../Player';

export abstract class AbstractLevel {

    public abstract getLevel(): Array<Array<number>>;
    public abstract getEnities(): Array<IBlock>;
    public abstract getStartPos(): Player;

}
