class CanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    updatecallback: Function[]
    clearonupdate: boolean;
    paused: boolean;
    updatespeed: number;
    fillstyle: string;

    constructor (Canvas: HTMLCanvasElement, updateCallBack: Function[], clearOnUpdate: boolean, paused: boolean, updateSpeed: number, fillStyle: string) {
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

    addCallBack (func: Function) {
        this.updatecallback.push(func)
    }

    fullScreenCanvas() {
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
    }

    removeCallBack(index: number) {
        this.updatecallback = this.updatecallback.filter(element => element != this.updatecallback[index])
    }

    static createCanvasWithManager(className: string, id: string, updateCallBack: Function[], clearOnUpdate: boolean, paused: boolean, updateSpeed: number, fillStyle: string) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
        return new CanvasManager(canvas, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle)
    }

    static createPlainCanvas(className: string, id: string) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
    }
}

class CanvasImage {
    image: HTMLImageElement;
    width: number;
    height: number;
    x: number;
    y: number;

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
    x: number;
    y: number
    radius: number
    startpoint: number
    endpoint: number

    constructor (x: number, y: number, radius: number, startpoint: number, endpoint: number) {
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