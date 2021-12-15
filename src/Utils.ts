export class Utils {
    public static Touching = (x1: number, x2: number, x3: number, x4: number) => {
        if (x1 > x3 && x1 < x4) return true;
        if (x2 > x3 && x2 <= x4) return true;
        return false;
    }
}