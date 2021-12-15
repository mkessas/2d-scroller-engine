import { MovingThing } from "./MovingThing";

import { Colors, Direction } from './Config';
import { Thing } from "./Thing";

export class Baddy extends MovingThing {

    public top: number;
    public left: number;
    public bottom: number;
    public right: number;
    private direction: number;
    private speed: number;

    constructor (x: number, y: number, w: number, h: number, f: string, t: string) {
        super(x, y, w, h, f, undefined);
        this.top = y + this.Height;
        this.left = x;
        this.bottom = y;
        this.right = x + this.Width;
        this.direction = Direction.Left;
        this.speed = 1;
        this.Type = t;
    }

    update = (objs: Thing[]) => {
        this.setFrame((this.Frame++ % (Colors.length - 3)) + 1);

        this.getBounds(objs);
        if (this.direction === Direction.Left) {
            if (this.Bounds.left.loc >= this.Left) { this.direction = Direction.Right; return; }
            this.coords(this.Left - this.speed, this.Top);
        }
        if (this.direction === Direction.Right) {
            if (this.Bounds.right.loc <= this.Right) { this.direction = Direction.Left; return; }
            this.coords(this.Left + this.speed, this.Top);
        }
    }
}