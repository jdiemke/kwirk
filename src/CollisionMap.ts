export class CollisionMap {

    private map: Array<boolean>;

    constructor(private width: number, private height: number) {
        this.map = new Array<boolean>(width * height);
    }

    public set(x: number, y: number, blocked: boolean): void {
        this.map[y * this.width + x] = blocked;
    }

    public get(x: number, y: number): boolean {
        return this.map[y * this.width + x];
    }

}
