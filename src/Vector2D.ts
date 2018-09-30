import { RotationDirection } from './RotationDirection';

export class Vector2D {
    constructor(public x: number, public y: number) {

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
