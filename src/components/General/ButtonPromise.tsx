'use client';
import React from 'react';
import { useStore } from '@nanostores/react';
import { $loading, Loading } from '../../Stores/Loading.Store.js';
import CircleLoading from './CircleLoading.js';


interface ButtonProps {
    id?: string;
    text: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => Promise<void> | void;
    stroke?: string;
    size?: number;
}

export default function ButtonPromise({ id = 'G_fetch', text, className, style, stroke, onClick, size }: ButtonProps) {
    const LOADING = useStore($loading)

    const handleClick = async () => {
        if (onClick) {
            try {
                await Loading.promise(onClick, id);
            } catch (error) {
                console.error(`Error al ejecutar la acción del botón ${id}:`, error);
            }
        }
    };

    return (
        <span className={`d-flex f-center relative ${className || 'btn-primary btn-promise br-6'}`} onClick={handleClick} style={style} data-btn-promise={id}>
            {
                LOADING[id] && <CircleLoading size={size || 20} stroke={stroke || 'rgb(var(--lb-black))'} />
            }
            <p className={`m-0 opacity-${LOADING[id] && '0'}`}>
                {text || 'Button'}
            </p>
        </span >
    )
}