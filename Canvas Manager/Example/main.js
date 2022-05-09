

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

    static createCanvasWithManager(className, id, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
        return new CanvasManager(canvas, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle)
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

// ---------- Start Deletable ----------

var ball = new circle(innerWidth/2, innerHeight/2, 5, 0, 2*Math.PI)

var isdown = false;
var x, y = 0;


addEventListener("mousedown", () => {
    isdown = true;
})

addEventListener("mousemove", event => {
    if (isdown) {
        //x = event.x
        //y = event.y
        console.log(event.x)
        console.log(event.y)
        ball.x = event.x;
        ball.y = event.y;
    }
})

addEventListener("mouseup", event => {
    isdown = false;
})

// Start Drawing Ball

// ---------- End Deletable ----------

addEventListener("resize", () => {
    canvasmanager.fullScreenCanvas()
})

function animate(ctx) {
    // Your Code Here
}

var canvasmanager = new CanvasManager(c, [], true, false, 10, 'white')

canvasmanager.addCallBack(animate)

canvasmanager.addCallBack(() => {
    ball.draw(canvasmanager.ctx)
})

canvasmanager.startUpdate()
