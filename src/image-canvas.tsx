import React, {useRef, useEffect, createRef} from 'react';
import './image-canvas.css'


class CanvasPainting {

    canvas: HTMLCanvasElement;
    context: any;
    coord = {x:0 , y:0};
    paint = false;

    constructor(canvas: any, context: any) {
        this.canvas = canvas;
        this.context = context;
    }

    updatePosition(event: MouseEvent){
        this.coord.x = event.clientX - this.canvas.offsetLeft;
        this.coord.y = event.clientY - this.canvas.offsetTop;
    }

    startPainting(event: MouseEvent){
        this.paint = true;
        this.updatePosition(event);
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

        this.context.lineWidth = 5;

        // Sets the end of the lines drawn
        // to a round shape.
        this.context.lineCap = 'round';

        this.context.strokeStyle = "#0000a0";

        // The cursor to start drawing
        // moves to this coordinate
        this.context.moveTo(this.coord.x, this.coord.y);

        // The position of the cursor
        // gets updated as we move the
        // mouse around.
        this.updatePosition(event);

        // A line is traced from start
        // coordinate to this coordinate
        this.context.lineTo(this.coord.x , this.coord.y);

        // Draws the line.
        this.context.stroke();
    }

}

// https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
class ImageCanvas extends React.Component {
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
        const canvas: any = this.canvasRef.current;
        const context = canvas.getContext('2d')
        const applyInside = <K extends keyof DocumentEventMap>(eventType: K, f: (e: DocumentEventMap[K]) => any) => {
            document.addEventListener(eventType, e => {
                if (canvas.contains(e.target)) {
                    f(e);
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
        return <canvas ref={this.canvasRef} className="ImageCanvas" height={200} width={200} />
    }
}

export default ImageCanvas;