'use client';
import React from 'react';
import { useStore } from '@nanostores/react';
import loading, { Loading } from '../Stores/Loading.Store.js'


interface ButtonProps {
    id?: string;
    text: string;
    className?: string;
    style?: React.CSSProperties;
    funct?: () => void;
    stroke?: string;
}

export default function ButtonPromise({ id = 'G_fetch', text, className, style, stroke, funct }: ButtonProps) {
    const LOADING = useStore(loading)

    const handleClick = async () => {
        if (!funct) return
        Loading.promise(funct, { id, delayOut: 20 })
    }

    return (
        <span className={`btn-promise f-row f-center btn br-6 relative ${className || 'btn-third'}`} onClick={handleClick} style={style} data-btn-promise={id}>
            {
                LOADING[id] && (
                    <span className="lb-loading-indicator absolute">
                        <span className="lb-circular-root" style={{ height: 20 }}>
                            <svg viewBox="22 22 44 44" stroke={stroke || 'rgb(var(--lb-black))'}>
                                <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth='4'></circle>
                            </svg>
                        </span>
                    </span>
                )
            }
            <p className={`m-0 opacity-${LOADING[id] && '0'}`}>{text || 'Button'}</p>
        </span >
    )
}