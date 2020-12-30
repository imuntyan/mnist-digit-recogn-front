import React, {useRef, useEffect, createRef} from 'react';
import './image-canvas.css'


class CanvasPainting {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    paint = false;
    img = new Image();
    lastPoint: any;
    scaleFactor = 0;

    constructor(canvas: any, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        const rect = this.canvas.getBoundingClientRect();
        // this.canvas.width = getComputedStyle()
        this.img.src = process.env.PUBLIC_URL + '/brush.png';
    }

    getPosition(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        // console.log(this.canvas.width + ":" + this.canvas.height + ":" + rect.left + ":" + rect.right + ":" + rect.top +
        // ":" + rect.bottom + ":" + event.clientX + ":" + event.clientY)
        return {
            x: (event.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
            y: (event.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
        }
    }

    startPainting(event: MouseEvent){
        this.paint = true;
        this.lastPoint = this.getPosition(event);
    }

    stopPainting() {
        this.paint = false;
    }

    clear() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height );
    }

    getDataUrl() {
        return this.canvas.toDataURL();
    }

    doPaint(event: MouseEvent){
        if (!this.paint) return;

        this.context.beginPath();

        this.context.lineWidth = 2;


        const distanceBetween = function (p1: any, p2: any) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        };
        const randomInt = function (min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        let currentPoint = this.getPosition(event);
        let dist = distanceBetween(this.lastPoint, currentPoint);
        let dx = 2 * (currentPoint.x - this.lastPoint.x) / dist;
        let dy = 2 * (currentPoint.y - this.lastPoint.y) / dist;

        let x = this.lastPoint.x;
        let y = this.lastPoint.y;

        this.scaleFactor = 0.5 * Math.min(5.0 / dist, 0.6) + 0.5 * this.scaleFactor;
        for (let i = 0; i < dist; i += 2) {
            x = x + dx;
            y = y + dy;
            this.context.save();
            this.context.translate(x, y);
            this.context.globalAlpha = 0.1 + this.scaleFactor;
            this.context.scale(0.5 + this.scaleFactor, 0.5 + this.scaleFactor);
            this.context.rotate(Math.PI * 180 / randomInt(0, 180));
            this.context.drawImage(this.img, 0 - 12.5, 0 - 12.5);
            this.context.restore();
        }
        this.lastPoint = currentPoint;

    }

}

// https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
class ImageCanvas extends React.Component {

    HEIGHT = 250;
    WIDTH = 275;

    props: any;
    canvasRef: any;
    cp: CanvasPainting | null = null;
    constructor(props: any) {
        super(props);
        this.props = props;
        this.canvasRef = createRef();
    }

    componentDidMount() {
        this.init();
    }

    clear() {
        console.log("clear")
        this.cp?.clear();
    }

    getDataUrl() {
        return this.cp?.getDataUrl();
    }

    init() {
        const canvas: HTMLCanvasElement = this.canvasRef.current;
        const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        const applyInside = <K extends keyof DocumentEventMap>(eventType: K, f: (e: DocumentEventMap[K]) => any) => {
            document.addEventListener(eventType, e => {
                if (canvas.contains(e.target as Node)) {
                    f(e);
                    e.preventDefault();
                    return;
                }
            });
        };
        this.cp = new CanvasPainting(canvas, context);
        applyInside('mousedown', e => this.cp?.startPainting(e));
        applyInside('mouseout', e => this.cp?.stopPainting());
        applyInside('mouseup', e => this.cp?.stopPainting());
        applyInside('mousemove', e => this.cp?.doPaint(e));
    }
    render() {
        return (
            <div>
                <img src={process.env.PUBLIC_URL + '/logo192.png'} />
                <canvas ref={this.canvasRef} className="ImageCanvas" height={this.HEIGHT} width={this.WIDTH} />
            </div>
            )
    }
}

export default ImageCanvas;