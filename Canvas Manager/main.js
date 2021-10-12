

class CanvasManager {
    constructor (Canvas, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle) {
        this.canvas = Canvas
        this.ctx = Canvas.getContext("2d");
        this.updatecallback = updateCallBack;
        this.clearonupdate = clearOnUpdate;
        this.paused = paused
        this.updatespeed = updateSpeed;
        this.fillstyle = fillStyle
    }

    worldUpdate() {
        if (!this.paused) {
            if (this.clearonupdate) {
                this.ctx.fillStyle = this.fillstyle
                this.ctx.clearRect(0, 0, innerWidth, innerHeight)
                this.ctx.fillRect(0, 0, innerWidth, innerHeight);
                
            }

            for (let i=0; i < this.updatecallback.length; i++) {
                this.updatecallback[i](this.ctx)
            }
        }
    }

    startUpdate() {
        setInterval(this.worldUpdate.bind(this), this.updatespeed);
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

    static createCanvasWithManager(className, id, updateCallBack, clearOnUpdate, paused, updateSpeed) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
        return new CanvasManager(canvas, updateCallBack, clearOnUpdate, paused, updateSpeed)
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
    1: add a file system for registered objects to save x, y or anything else in the object?? (would have to switch to node and a server)

    2:

*/

CanvasManager.createPlainCanvas('canvas', 'canvas')

var c = document.getElementById('canvas');

class CanvasImage {
    constructor (src, width, height, x, y) {
        this.image = new Image(width, height);
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    changeImage (src) {
        this.image.src = src
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

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

var ballxgoback = false;
var ballygoback = false;

function animate(ctx) {
    if (!ballxgoback && !isdown) {
        ball.x += 3;
    }
    else if (!isdown) {
        ball.x -= 3;
    }

    if (!ballygoback && !isdown) {
        ball.y += 3;
    }
    else if (!isdown) {
        ball.y -= 3;
    }


    if (ball.y+ball.radius >= innerHeight) {
        ballygoback = true;
    }

    if (ball.y-ball.radius <= 0) {
        ballygoback = false;
    }

    if (ball.x+ball.radius >= innerWidth) {
        ballxgoback = true;
    }

    if (ball.x-ball.radius <= 0) {
        ballxgoback = false;
    }

}


// to animate ball add animate to call back
var canvasmanager = new CanvasManager(c, [], true, false, 10)
canvasmanager.startUpdate()

// Start Drawing Ball

//canvasmanager.addCallBack(() => {
//    ball.draw(canvasmanager.ctx)
//})

var dvdlogolink = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/DVD-Video_Logo.svg/1200px-DVD-Video_Logo.svg.png"

// random dvd logo link off of google. I do not own this

var newimage = new CanvasImage(dvdlogolink, 100, 100, 100, 100)

canvasmanager.addCallBack((ctx) => {
    newimage.draw(ctx)
})

addEventListener("resize", () => {
    canvasmanager.fullScreenCanvas()
})

var logoxgoback = false;
var logoygoback = false;

function animateLogo(ctx) {
    if (!logoxgoback && !isdown) {
        newimage.x += 3;
    }
    else if (!isdown) {
        newimage.x -= 3;
    }

    if (!logoygoback && !isdown) {
        newimage.y += 3;
    }
    else if (!isdown) {
        newimage.y -= 3;
    }


    if (newimage.y+newimage.height >= innerHeight) {
        logoygoback = true;
    }

    if (newimage.y <= 0) {
        logoygoback = false;
    }

    if (newimage.x+newimage.width >= innerWidth) {
        logoxgoback = true;
    }

    if (newimage.x <= 0) {
        logoxgoback = false;
    }

}

canvasmanager.addCallBack(animateLogo)