import { Canvas, Colors, Direction, Gravity, JumpHeight, Level, MaxSpeed, MoveX } from "./Config";
import { MovingThing } from "./MovingThing";
import { Thing } from "./Thing";

export class Player extends MovingThing {

    private jumpKey: boolean;
    private lastJumpedObj: number;

    constructor (x: number, y: number) {
        super(x, y, 20, 20, Colors[0], undefined);
        this.Top = y + this.Height;
        this.Left = x;
        this.Bottom = y;
        this.Right = x + this.Width;
        this.jumpKey = false;
    }


    move = (direction: Direction, objs: Thing[]) => {
        let x = 0;

        switch (direction) {
            case Direction.Left:
                x = -MoveX * this.SpeedX;
                if ((this.Left < Canvas.offset.x + Canvas.x / 2) && Canvas.offset.x > 0) Canvas.offset.x += x;
                break;
            case Direction.Right:
                x = MoveX * this.SpeedX;
                if ((this.Left > Canvas.offset.x + Canvas.x / 2) && Canvas.offset.x + Canvas.x < Level.x) Canvas.offset.x += x;
                break;
        }

        this.getBounds(objs)
        if (this.Right + x > this.Bounds.right.loc) x = this.Bounds.right.loc - this.Right;
        if (this.Left + x < this.Bounds.left.loc) x = this.Bounds.left.loc - this.Left;

        if (!this.jumping()) {
            this.setFrame((this.Frame++ % (Colors.length) - 2));
        }
        this.coords(this.Left + x, this.Top);
    }

    jumping = () => this.Bottom > this.Bounds.bottom.loc;

    goingUp = () => {
        if (this.SpeedY > 0) { return true }
        else return false
    }

    noJump = () => this.jumpKey = false;

    jump = () => {

        let doJump = false;

        if (this.JumpBoost > 0) {
            this.JumpBoost += Gravity;
            this.SpeedY -= Gravity;
        }

        if (!this.jumpKey && this.jumping()) {

            if (this.Left === this.Bounds.left.loc) {
                if (this.lastJumpedObj != this.Bounds.left.obj.ID) doJump = true;
                // this.move(RIGHT);
                this.lastJumpedObj = this.Bounds.left.obj.ID;

            }
            if (this.Right === this.Bounds.right.loc) {
                if (this.lastJumpedObj != this.Bounds.right.obj.ID) doJump = true;
                // this.move(LEFT);
                this.lastJumpedObj = this.Bounds.right.obj.ID;
            }

        }

        this.jumpKey = true;

        if (this.Bottom === this.Bounds.bottom.loc) doJump = true;

        if (doJump) {
            this.JumpBoost = JumpHeight * 2;
            this.SpeedY = JumpHeight;
            this.coords(this.Left, this.Top + 1)
        }
    }

    update = (objs: Thing[]) => {

        this.getBounds(objs)

        if (this.jumping()) {

            this.setFrame(Colors.length - 2);

            if (this.SpeedY < MaxSpeed) this.SpeedY += Gravity; // if not max speed

            if (this.Top + this.SpeedY > this.Bounds.top.loc) { // if going to hit top bounds
                this.coords(this.Left, this.Bounds.top.loc);
                this.SpeedY = 0;
                this.JumpBoost = 0;
            }

            this.coords(this.Left, this.Top + this.SpeedY); // update height

            if (this.Bottom + this.SpeedY > Canvas.y / 2) { // if not below half way
                if (Canvas.offset.y + this.SpeedY + Canvas.y < Level.y) { // if not going to go over Level.y
                    if (!this.goingUp() && this.Bottom + this.SpeedY < Canvas.y / 2 + Canvas.offset.y) {
                        Canvas.offset.y += this.SpeedY;
                    }
                    if (this.goingUp()) {
                        Canvas.offset.y += this.SpeedY;
                    }
                }
            }
            if (this.Bottom - (Canvas.y / 2) < 0) { // reset Canvas y offset smoothly
                if (Canvas.offset.y >= 0) {
                    Canvas.offset.y -= 5;
                }
                if (Canvas.offset.y < 0) {
                    Canvas.offset.y = 0
                }
            }

            if (this.Bottom + this.SpeedY <= this.Bounds.bottom.loc) { // if on bottom bounds
                this.coords(this.Left, this.Bounds.bottom.loc + this.Height);
                this.SpeedY = 0;
                this.setFrame(0);
                this.lastJumpedObj = null;
            }
        }
    }
}