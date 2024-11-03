'use client';
import React,{ useState } from "react";

interface InputColorProps {
    initialValue: string;
    funct?: (value: any) => void;
}

export default function InputRange({
    initialValue,
    funct = (value: any) => {
        console.log('Sin funcion', value);
    }
}: InputColorProps ) {
    //States
    const [value, setValue] = useState(initialValue);
    
    const handleInputChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);
        funct(newValue);
    };

    return (
        <input type="color"
            value='#1348a9'
            onInput={handleInputChange}
        />
    )
}