import React, {useRef, useEffect} from 'react';
import './image-canvas.css'



const ImageCanvas = (props: any) => {

    const canvasRef = useRef(null);

    let pressed: boolean;
    const moves: any[] = [];

    function redraw(canvas: any, context: any) {
        context.strokeStyle = "#0000a0";
        context.lineJoin = "round";
        context.lineWidth = 6;

        // context.moveTo(199, 0);
        // context.lineTo(0,150);
        // context.closePath();
        // context.stroke();

        for(var i=0; i < moves.length; i++)
        {
            context.beginPath();
            if(moves[i][2]){
                context.moveTo(moves[i-1][0], moves[i-1][1]);
            }else{
                context.moveTo(moves[i][0], moves[i][1]);
            }
            context.lineTo(moves[i][0], moves[i][1]);
            context.closePath();
            context.stroke();
        }
    }

    const mouseDown = (e: any, canvas: any, context: any) => {
        pressed= true;
        moves.push([e.pageX - canvas.offsetLeft,
            e.pageY - canvas.offsetTop,
            false]);
        redraw(canvas, context);
    }
    const mouseUp = () => {
        pressed= false;
    }

    const mouseLeave = () => {
        console.log("Mouse Leave")
        pressed= false;
    }

    const mouseMove = (e: any, canvas: any, context: any) => {
        console.log(moves.length)
        if(pressed){
            moves.push([e.pageX - canvas.offsetLeft,
                e.pageY - canvas.offsetTop,
                true]);
            redraw(canvas, context);
        }
    }


    useEffect(() => {
        const canvas: any = canvasRef.current;
        const context = canvas.getContext('2d')
        //Our first draw
        // context.fillStyle = '#000000'
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        document.addEventListener('mousedown', e => {
            if (canvas.contains(e.target)) {
                mouseDown(e, canvas, context);
                return;
            }
        });
        document.addEventListener('mouseout', e => {
            if (canvas.contains(e.target)) {
                mouseLeave();
                return;
            }
        });

        document.addEventListener('mouseup', e => {
            if (canvas.contains(e.target)) {
                mouseUp();
                return;
            }
        });

        document.addEventListener('mousemove', e => {
            if (canvas.contains(e.target)) {
                mouseMove(e, canvas, context);
                return;
            }
        });

    }, []);


    return <canvas ref={canvasRef} className="ImageCanvas" height={200} width={200} {...props} />
}


export default ImageCanvas;