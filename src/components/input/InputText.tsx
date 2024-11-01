import React from "react";
import { useState } from "react";

interface InputTextProps {
    placeholder?: string,
    type: string | 'text' | 'password' | 'email',
    msg?: string,
    className?: string,
    name?: string,
    style?: React.CSSProperties,
    onBlur?: (e: any) => void,
    onFocus?: (e: any) => void,
    onChange?: (e: any) => void,
    state?: string
}

export default function InputText({
    placeholder, type = 'text', msg, className, style, name, onBlur, onFocus, onChange, state
}: InputTextProps) {
    //State
    const [isSee, setIsSee] = useState(false)

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            e.target.parentElement?.classList.remove('focused')
        }

        onBlur?.(e)
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.parentElement?.classList.add('focused')

        onFocus?.(e)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
    }

    const handleTogglePassword = (e: React.MouseEvent<HTMLSpanElement>) => {
        const parent = (e.target as HTMLSpanElement).parentElement
        const input = parent?.querySelector('input')
        input?.setAttribute('type', input?.getAttribute('type') === 'password' ? 'text' : 'password')
        setIsSee(v => !v)
    }

    return (
        <label className="lb-input-text f-col relative g-1">
            <span className="holder absolute no-select">{placeholder}</span>
            <input type={type} className={className} style={style} name={name || type} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
            <span>{msg}</span>
            {
                type === 'password' ? (
                    <span className="icon absolute" style={{ right: '12px', top: '47%', transform: 'translateY(-50%)' }} onClick={handleTogglePassword} title={isSee ? 'Hide password' : 'Show password'}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <g>
                                {
                                    isSee ? (
                                        <path d="M9.76404 5.29519C10.4664 5.10724 11.2123 5 12 5C15.7574 5 18.564 7.4404 20.2326 9.43934C21.4848 10.9394 21.4846 13.0609 20.2324 14.5609C20.0406 14.7907 19.8337 15.0264 19.612 15.2635M12.5 9.04148C13.7563 9.25224 14.7478 10.2437 14.9585 11.5M3 3L21 21M11.5 14.9585C10.4158 14.7766 9.52884 14.0132 9.17072 13M4.34914 8.77822C4.14213 9.00124 3.94821 9.22274 3.76762 9.43907C2.51542 10.9391 2.51523 13.0606 3.76739 14.5607C5.43604 16.5596 8.24263 19 12 19C12.8021 19 13.5608 18.8888 14.2744 18.6944" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    ) : (
                                        <>
                                            <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </>
                                    )
                                }
                            </g>
                        </svg>
                    </span>
                ) : null
            }
        </label>
    )
}
