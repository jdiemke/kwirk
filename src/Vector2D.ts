import { RotationDirection } from './blocks/RotationDirection';

export class Vector2D {

    constructor(public x: number, public y: number) {

    }

    public sub(vector: Vector2D): Vector2D {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    public dot(vector: Vector2D): number {
        return this.x * vector.x + this.y * vector.y;
    }

    public length(): number {
        return Math.sqrt( this.x * this.x + this.y * this.y);
    }

    /**
     * https://math.stackexchange.com/questions/74307/two-2d-vector-angle-clockwise-predicate
     *
     * @param vector
     */
    public determienRotationDirectionTo(vector: Vector2D): RotationDirection {
        const cz = this.x * vector.y - this.y * vector.x;

        if (cz > 0) {
            return RotationDirection.CW;
        } else if (cz < 0) {
            return RotationDirection.CCW;
        } else {
            return RotationDirection.PARALLEL;
        }
    }
}
