import React, {createRef, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import './image-canvas';
import ImageCanvas from "./image-canvas";
import Controls from "./controls";

function App() {

    const ref = useRef(null);

    const clearHandler = (e: Event) => {
        console.log(e)
        const x: any = ref;
        console.log(x);
        // x.clear();
    }

    const submitHandler = (e: Event) => {
        console.log(e)
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
