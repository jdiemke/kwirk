export class Player {

    public switchTime: number;
    public finished: boolean = false;
    private oldX: number;
    private oldY: number;

    constructor(private x: number, private y: number) {
        this.oldX = x;
        this.oldY = y;
    }

    public draw(context: CanvasRenderingContext2D, lastTime: number, kwirk): void {
        const myPl: Player = this.interpolate(
            new Player(this.oldX, this.oldY),
            this, (Date.now() - lastTime) * 0.006);

        if (this.switchTime && (this.switchTime + 600) > Date.now()) {
            const flicker: number = Math.floor((Date.now() - this.switchTime) * 0.008) % 2;
            context.globalAlpha = 0.75 * flicker;
        }

        context.drawImage(
            kwirk,
            (Math.floor(Date.now() * 0.008) % 2) * 8,
            0, 8, 16,
            Math.floor(myPl.getX() * 8), Math.floor(myPl.getY() * 8 - 3), 8, 16);
        context.globalAlpha = 1;
    }

    public interpolate(oldPlayer: Player, player: Player, time: number): Player {
        const k: number = Math.max(0, Math.min(time, 1));
        return new Player(
            this.inter(oldPlayer.getX(), player.getX(), k),
            this.inter(oldPlayer.getY(), player.getY(), k));
    }

    public setOldPosition(player: Player): void {
        this.oldX = player.getX();
        this.oldY = player.getY();
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
