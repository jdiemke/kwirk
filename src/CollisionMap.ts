export class CollisionMap {

    private map: Array<number>;

    constructor(private width: number, private height: number) {
        this.map = new Array<number>(width * height);
    }

    public set(x: number, y: number, blocked: number): void {
        this.map[y * this.width + x] = blocked;
    }

    public get(x: number, y: number): number {
        return this.map[y * this.width + x];
    }

}
