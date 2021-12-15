export const Colors = ["black", "green", "yellow", "orange", "orangered", "red", "blue", "purple", "cyan"];
export const Level = { x: 1600, y: 700 };
export const MoveX = 2;
export const Canvas = { x: 800, y: 450, offset: { x: 0, y: 0 } };
export const Gravity = -.2;
export const MaxSpeed = 10;
export const JumpHeight = 3.5;

export enum Direction {
    Left,
    Right,
}
export const Things = [
    { x: 0, y: 0, width: Level.x, height: 25, color: "brown", type: "platform" }, //ground
    { x: 0, y: 25, width: Level.x, height: 7, color: "#60ff30", type: "grass" }, //grass
    { x: 550, y: 7 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 300, y: 5.5 / 10 * Canvas.y, width: 75, height: 25, color: "brown", type: "platform" }, //platform
    { x: 650, y: 4 / 10 * Canvas.y, width: 150, height: 25, color: "brown", type: "platform" }, //platform
    { x: 0, y: 5 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 150, y: 8 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 100, y: 5 / 10 * Canvas.y, width: 25, height: 100, color: "brown", type: "platform" }, //vertical platform
    { x: 450, y: 3 / 10 * Canvas.y, width: 25, height: 50, color: "brown", type: "platform" }, //vertical platform
    { x: 550, y: 3 / 10 * Canvas.y, width: 25, height: 50, color: "brown", type: "platform" }, //vertical platform
    { x: 650, y: 4 / 10 * Canvas.y, width: 25, height: 160, color: "brown", type: "platform" }, //vertical platform
    { x: 450, y: 3 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 500, y: 14 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 400, y: 11 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 100, y: 2.5 / 10 * Canvas.y, width: 100, height: 25, color: "brown", type: "platform" }, //platform
    { x: 700, y: 4 / 10 * Canvas.y + 25, width: 20, height: 20, color: "gold", type: "goal" },  //goal
    { x: 80, y: 5 / 10 * Canvas.y + 25, width: 20, height: 20, color: "gold", type: "goal" },  //goal
    { x: 505, y: 3 / 10 * Canvas.y + 25, width: 20, height: 20, color: "gold", type: "goal" },  //goal
    { x: 80, y: 5 / 10 * Canvas.y + 25, width: 20, height: 20, color: "red", type: "baddy" },  //baddy
    { x: 750, y: 4 / 10 * Canvas.y + 25, width: 20, height: 20, color: "red", type: "baddy" },  //baddy
    { x: 80, y: 100, width: 20, height: 20, color: "red", type: "baddy" },  //baddy
    { x: 160, y: 32, width: 20, height: 20, color: "red", type: "baddy" },  //baddy
];
