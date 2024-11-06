'use client';

import React from "react";

interface InputColorProps {
    initialValue: string;
    funct?: (value: any) => void;
}

const InputRange =({
    initialValue,
    funct = (value: any) => {
        console.log('Sin funcion', value);
    }
}: InputColorProps ) =>{

    //States
    const [value, setValue] = React.useState(initialValue);
    
    const handleInputChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);
        funct(newValue);
    };

    return (
        <input type="color"
            value={value || '#1348a9'}
            onInput={handleInputChange}
        />
    )
}

export default InputRange;