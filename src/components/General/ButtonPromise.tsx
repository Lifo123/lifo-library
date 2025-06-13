'use client';
import { useStore } from '@nanostores/react';
import { $loading, Loading } from '../../Stores/Loading.Store.js';
import { BaseComponentProps } from '../../Types/GeneralTypes.js';
import CircleLoading from '../Loading/CircleLoading.js';

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
        <span className={`d-flex f-center relative ${className || 'btn-primary btn-promise br-6 btn pointer fs-2'}`} onClick={handleClick} style={style} data-btn-promise={loadingId}>
            {
                LOADING[loadingId] && <CircleLoading size={size || 20} stroke={stroke || 'rgb(var(--lb-black))'} />
            }
            <p className={`m-0 opacity-${LOADING[loadingId] && '0'}`}>
                {text || 'Button'}
            </p>
        </span >
    )
}