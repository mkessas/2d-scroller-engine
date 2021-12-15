import { Colors } from './Config';

export class Thing {
    protected Width: number;
    protected Height: number;
    protected Left: number;
    protected Top: number;
    protected Bottom: number;
    protected Right: number;
    protected Fill: string;
    public ID: number;
    protected Frame: number;
    protected Type: string;

    constructor (x: number, y: number, width: number, height: number, fill: string) {
        this.Width = width;
        this.Height = height;
        this.Left = x;
        this.Top = y + height;
        this.Bottom = y;
        this.Right = x + width;
        this.Fill = fill;
        this.ID = Math.random() * 1024;
    }

    public coords(x: number, y: number) {
        this.Left = x; this.Top = y; this.Right = x + this.Width; this.Bottom = y - this.Height;
    }

    public update(objs: Thing[]) {

    }


    public getState() {
        return {
            top: this.Top,
            right: this.Right,
            bottom: this.Bottom,
            width: this.Width,
            height: this.Height,
            left: this.Left,
            fill: this.Fill || Colors[this.Frame !== undefined ? this.Frame : 4],
        }
    }
}