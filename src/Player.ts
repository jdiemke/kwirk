export class Player {
    constructor(private x: number, private y: number) {

    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public interpolate(player: Player, time: number): Player {
        const k: number = Math.max(0, Math.min(time, 1));
        return new Player(
            this.inter(this.getX(), player.getX(), k),
            this.inter(this.getY(), player.getY(), k));
    }

    private inter(a, b, val): number {
        if (val < 0) {
            return a;
        }

        if (val > 1) {
            return b;
        }

        return (b - a) * val + a;
    }
}
