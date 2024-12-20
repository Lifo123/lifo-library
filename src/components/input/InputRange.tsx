'use client';

import React from "react";


const InputRange = ({
    min = 3, max = 10,
    initialValue = 5,
    step = 1,
    funct = (value: any) => {
        console.log('Sin funcion', value);
    }
}) => {

    //States
    const [value, setValue] = React.useState(initialValue);

    const handleInputChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);
        funct(newValue);
    };

    return (
        <input type="range"
            min={min} max={max}
            value={value} step={step}
            onInput={handleInputChange}
        />
    )
}

export default InputRange;