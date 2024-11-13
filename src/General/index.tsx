'use client';
import React from 'react';
interface Props {
    style?: React.CSSProperties;
    stroke?: string;
    size?: number;
}

const Loading = ({ style, stroke, size }: Props) => {

    return (
        <span className="lb-loading-indicator no-select">
            <span className="lb-circular-root" style={{ ...style, height: size || 50 }}>
                <svg viewBox="22 22 44 44" stroke={stroke || 'rgb(var(--lb-title))'}>
                    <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth='3.6'></circle>
                </svg>
            </span>
        </span>
    )
}

interface ButtonProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    funct?: () => void;
    stroke?: string;
}

const ButtonPromise = ({ text, className, style, stroke, funct = () => {
    console.log('Without function');
} }: ButtonProps) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true)
        await funct()
    }


    return (
        <span className={`btn-promise f-row f-center btn br-6 relative ${className || 'btn-third'}`} onClick={handleClick} style={style}>
            {
                isLoading && (
                    <span className="lb-loading-indicator absolute">
                        <span className="lb-circular-root" style={{ height: 20 }}>
                            <svg viewBox="22 22 44 44" stroke={stroke || 'rgb(var(--lb-white))'}>
                                <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth='4'></circle>
                            </svg>
                        </span>
                    </span>
                )
            }
            <p className={`m-0 opacity-${isLoading && '0'}`}>{text || 'Button'}</p>
        </span >
    )
}


export { Loading, ButtonPromise };