import { Thing } from './Thing';
import { Colors, Level } from './Config';
import { Utils } from './Utils';

type BoundType = {
    loc: number,
    obj: Thing,
}
export type Bound = {
    top: BoundType,
    right: BoundType,
    bottom: BoundType,
    left: BoundType,
}

export class MovingThing extends Thing {

    protected Frame: number = 0;
    protected SpeedY: number;
    protected SpeedX: number;
    protected JumpBoost: number;
    protected Bounds: Bound;

    constructor (x: number, y: number, w: number, h: number, f: string, t: string) {
        super(x, y, w, h, f);
        this.SpeedY = 0;
        this.SpeedX = 1;
        this.JumpBoost = 0;
        this.Type = t;
    }

    setFrame(f: number) {
        this.Frame = f; this.Fill = Colors[f];
    }

    getBounds(objs: Thing[]) {
        let b: Bound = {
            top: {
                loc: Level.y,
                obj: new Thing(0, Level.y, Level.x, 0, ""),//{ Type: "canvas", ID: "top" },
            },
            right: {
                loc: Level.x,
                obj: new Thing(Level.x, 0, 0, Level.y, ""),//{ ID: "right", Type: "canvas" },
            },
            bottom: {
                loc: 0,
                obj: new Thing(0, 0, Level.x, 0, ""), //{ ID: "bottom", Type: "canvas" },
            },
            left: {
                loc: 0,
                obj: new Thing(0, 0, 0, Level.y, ""), //{ ID: "left", Type: "canvas" },
            },
        };

        for (let o of objs) {
            let s = o.getState();
            if (Utils.Touching(this.Left, this.Right, s.left, s.right)) {
                if (this.Bottom >= s.top && s.top > b.bottom.loc) { b.bottom.loc = s.top; b.bottom.obj = o };
                if (this.Top < s.bottom && s.bottom <= b.top.loc) { b.top.loc = s.bottom; b.top.obj = o };
            }
            if (Utils.Touching(this.Bottom, this.Top, s.bottom, s.top)) {
                if (this.Right <= s.left && s.left < b.right.loc) { b.right.loc = s.left; b.right.obj = o }
                if (this.Left >= s.right && s.right > b.left.loc) { b.left.loc = s.right; b.left.obj = o }
            }
        }
        this.Bounds = b;
    }

    run = () => this.SpeedX = 1.5;

    walk = () => this.SpeedX = 1;

    stop = () => { this.SpeedX = 1; this.setFrame(0); }

}