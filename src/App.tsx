import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import './image-canvas';
import ImageCanvas from "./image-canvas";
import Controls from "./controls";
import Graph from "./graph";

function App() {

    const [chart, setChart] = useState([]);

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

        fetch('http://localhost:8000/api/image', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: data
            })
        }).then((r) => {
            return r.json();
        }).then(r => {
            console.log(r);
            const chart = r.message.reduce( (acc: any, curr: any, index: number) => {
                acc.push({digit: index, probability: curr});
                return acc;
            }, []);
            setChart(chart);
        })

    }


    return (
        <div className="App">
            <header className="App-header">
                <ImageCanvas ref={ref}/>
                <Controls clearHandler={clearHandler} submitHandler={submitHandler}/>
                <Graph chart={chart} />
            </header>
        </div>
    );
}

export default App;
