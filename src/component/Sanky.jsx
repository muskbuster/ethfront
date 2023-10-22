import React, { useEffect } from 'react';


function Sanky(props) {
    useEffect(() => {
        props.func();
    }, []);
    return (
        <div>
           
            <canvas id={"ethChart"}/>
        </div>
    )
}

export default Sanky