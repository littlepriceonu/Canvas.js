

class CanvasManager {
    constructor (Canvas, updateCallBack, clearOnUpdate) {
        this.canvas = Canvas
        this.ctx = Canvas.getContext("2d");
        this.updatecallback = updateCallBack;
        this.clearonupdate = clearOnUpdate;
    }

    worldUpdate() {
        if (this.clearonupdate) {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight)
        }

        for (let i=0; i < this.updatecallback.length; i++) {
            this.updatecallback[i](this.ctx)
        }
    }

    startUpdate() {
        setInterval(this.worldUpdate.bind(this), 10);
    }

    addCallBack (func) {
        this.updatecallback.push(func)
    }

    fullScreenCanvas() {
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
    }

    removeCallBack(index) {
        this.updatecallback = this.updatecallback.filter(element => element != this.updatecallback[index])
    }

    static createCanvasWithManager(className, id, updateCallBack, clearOnUpdate) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
        return new CanvasManager(canvas, updateCallBack, clearOnUpdate)
    }

    static createPlainCanvas(className, id) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
    }
}

/* TODO: 
    (Add Ideas Here)
    1: add a file system for registered objects to save x, y or anything else in the object??

    2:

*/

CanvasManager.createPlainCanvas('canvas', 'canvas')

var c = document.getElementById('canvas');

class circle {
    constructor (x, y, radius, startpoint, endpoint) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startpoint = startpoint;
        this.endpoint = endpoint;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startpoint, this.endpoint);
        ctx.stroke();
    }
}

var ball = new circle(500, 350, 50, 0, 2*Math.PI)

var isdown = false;
var x, y = 0;


addEventListener("mousedown", () => {
    isdown = true;
})

addEventListener("mousemove", event => {
    if (isdown) {
        //x = event.x
        //y = event.y
        ball.x = event.x;
        ball.y = event.y;
    }
})

addEventListener("mouseup", event => {
    isdown = false;
})

var xgoback = false;
var ygoback = false;

function animate(ctx) {
    if (!xgoback && !isdown) {
        ball.x += 3;
    }
    else if (!isdown) {
        ball.x -= 3;
    }

    if (!ygoback && !isdown) {
        ball.y += 3;
    }
    else if (!isdown) {
        ball.y -= 3;
    }


    if (ball.y+ball.radius >= innerHeight) {
        ygoback = true;
    }

    if (ball.y-ball.radius <= 0) {
        ygoback = false;
    }

    if (ball.x+ball.radius >= innerWidth) {
        xgoback = true;
    }

    if (ball.x-ball.radius <= 0) {
        xgoback = false;
    }

    ball.draw(ctx)
}

var canvasmanager = new CanvasManager(c, [animate], true)
canvasmanager.startUpdate()

addEventListener("resize", () => {
    canvasmanager.fullScreenCanvas()
})