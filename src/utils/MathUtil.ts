namespace app {

    export class MathUtil {

        public static degs2Rads(degs: number): number {
            return degs * Math.PI / 180;
        }

        public static rads2Degs(rads: number): number {
            return rads * 180 / Math.PI;
        }
    }
}