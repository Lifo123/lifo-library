'use client';
import { useStore } from '@nanostores/react';
import { $loading, Loading } from '../../Stores/Loading.Store.js';
import { BaseComponentProps } from '../../Types/GeneralTypes.js';
import Icons from '../Icons/Icons.js';

//test

interface ButtonProps extends BaseComponentProps {
    loadingId?: string;
    text?: string;
    onClick?: () => Promise<void>;
    stroke?: string;
    size?: number;
}

export default function ButtonPromise({ loadingId = 'G_Fetch', text, className, style, stroke, onClick, size }: ButtonProps) {
    const LOADING = useStore($loading)

    const handleClick = async () => {
        if (onClick) {
            try {
                await Loading.promise(onClick, loadingId);
            } catch (error) {
                console.error(`Error al ejecutar la acción del botón ${loadingId}:`, error);
            }
        }
    };

    return (
        <span className={`d-flex f-center relative ${className || 'btn-primary rounded-md btn pointer fs-2'}`} onClick={handleClick} style={style} data-btn-promise={loadingId}>
            {
                LOADING[loadingId] && <span className='absolute' style={{marginTop: '1px'}}>
                    <Icons icon='loading' size={size || 22} />
                </span>
            }
            <p className={`m-0 ${LOADING[loadingId] && 'opacity-0'}`}>
                {text || 'Button'}
            </p>
        </span >
    )
}