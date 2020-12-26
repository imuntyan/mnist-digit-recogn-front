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

    const mouseOut = () => {
        pressed= false;
    }

    const mouseMove = (e: any, canvas: any, context: any) => {
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

        const applyInside = <K extends keyof DocumentEventMap>(eventType: K, f: (e: DocumentEventMap[K]) => any) => {
            document.addEventListener(eventType, e => {
                if (canvas.contains(e.target)) {
                    f(e);
                    return;
                }
            });
        };

        applyInside('mousedown', e => {mouseDown(e, canvas, context)});
        applyInside('mouseout', e => {mouseOut()});
        applyInside('mouseup', e => {mouseUp()});
        applyInside('mousemove', e => {mouseMove(e, canvas, context)});

    }, []);


    return <canvas ref={canvasRef} className="ImageCanvas" height={200} width={200} {...props} />
}


export default ImageCanvas;