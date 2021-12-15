import { Thing } from './Thing';

export class Platform extends Thing {
    constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h || 25, "brown")
    }
}