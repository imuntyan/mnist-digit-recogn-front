import React from 'react';
import "./controls.css"

const Controls = (props: any) => {

    // const submitHandler = (e: Event) => {
    //     props.submitHandler
    // }

    return (
        <div className="Controls">
            <button onClick={props.submitHandler}>Submit</button>
            <button onClick={props.clearHandler}>Clear</button>
        </div>
    );
};

export default Controls;