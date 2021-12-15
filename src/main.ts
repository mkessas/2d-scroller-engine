import { Thing } from './Thing';
import { Player } from './Player';
import { Canvas, Direction, Things } from './Config';
import { Baddy } from './Baddy';

import './sass/style.scss';

const KeyDown: Record<string,boolean> = {}

const BACKGROUND = [
    { image: document.getElementById("clouds") as CanvasImageSource, x: 200, y: 0, width: 528, height: 200, },
];

const checkInput = () => {
    KeyDown['Shift'] && player.run();
    KeyDown[' '] && player.jump();
    KeyDown['ArrowRight'] && player.move(Direction.Right, [...objects, ...baddies]);
    KeyDown['ArrowLeft'] && player.move(Direction.Left, [...objects, ...baddies]);
};

const resetInput = (key: string) => {
    if (key == 'ArrowRight' || key == 'ArrowLeft') player.stop();
    if (key == 'Shift') player.walk();
    if (key == ' ') player.noJump();
}


const redraw = () => {
    ctx.clearRect(0, 0, Canvas.x, Canvas.y);
    checkInput();

    // ctx.beginPath();
    // ctx.rect(0,0,CANVAS.x,CANVAS.y);
    // ctx.fillStyle = "#aeccfc";
    // ctx.fill();

    for (let b of BACKGROUND) {
        ctx.drawImage(b.image, b.x - Canvas.offset.x/3, b.y + Canvas.offset.y/2, b.width, b.height);
    }

    const objs = [player, ...objects, ...baddies]
    for (let o of objs) {
        o.update(objs);

        ctx.beginPath();
        let l = o.getState();
        ctx.rect(l.left - Canvas.offset.x, Canvas.y - l.top + Canvas.offset.y, l.width, l.height);
        ctx.fillStyle = l.fill;
        ctx.fill();
    }

    window.requestAnimationFrame(redraw);
}

const baddies = Things
    .filter(obj => obj.type === "baddy")
    .map(obj => new Baddy(obj.x, obj.y, obj.width, obj.height, obj.color, obj.type));

const objects = Things
    .filter(obj => obj.type !== "baddy")
    .map(obj => new Thing(obj.x, obj.y, obj.width, obj.height, obj.color));


const player = new Player(Canvas.x / 2, Canvas.y / 2);

const Resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Canvas.x = window.innerWidth;
    Canvas.y = window.innerHeight;
    // sim.Resize(window.innerWidth, window.innerHeight);
}

document.addEventListener('keydown', (e) => KeyDown[e.key] = true);
document.addEventListener('keyup', (e) => {
    KeyDown[e.key] = false;
    resetInput(e.key);
});
// window.addEventListener('resize', Resize);


const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
canvas.setAttribute("width", Canvas.x.toString())
canvas.setAttribute("height", Canvas.y.toString())
redraw();
// Resize();