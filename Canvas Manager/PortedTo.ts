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


