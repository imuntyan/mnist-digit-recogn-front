import React, {createRef, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import './image-canvas';
import ImageCanvas from "./image-canvas";
import Controls from "./controls";

function App() {

    const ref = useRef();

    const clearHandler = (e: Event) => {
        const canvas: ImageCanvas | undefined = ref.current;
        // @ts-ignore
        canvas.clear();
    }

    const submitHandler = (e: Event) => {
        const canvas: ImageCanvas | undefined = ref.current;
        // @ts-ignore
        const data = canvas.getDataUrl();
        console.log(data);
    }


    return (
        <div className="App">
            <header className="App-header">
                <ImageCanvas ref={ref}/>
                <Controls clearHandler={clearHandler} submitHandler={submitHandler}/>
            </header>
        </div>
    );
}

export default App;
