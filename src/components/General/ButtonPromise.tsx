'use client';
import { useStore } from '@nanostores/react';
import { $loading, Loading } from '../../Stores/Loading.Store.js';
import { Icon } from 'public-icons';
import { Button, ButtonProps } from 'react-aria-components';

//test

interface ButtonPromiseProps extends ButtonProps {
    loadingId?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onPress?: () => Promise<void>;
    size?: number;
}

export default function ButtonPromise({
    loadingId = 'G_Fetch', children, className, style, onPress, size, ...props
}: ButtonPromiseProps) {
    const LOADING = useStore($loading)

    const handleClick = async () => {
        if (onPress) {
            try {
                await Loading.promise(onPress, loadingId);
            } catch (error) {
                console.error(`Error al ejecutar la acción del botón ${loadingId}:`, error);
            }
        }
    };

    return (
        <Button
            className={`d-flex f-center relative ${className || 'btn-primary rounded-sm btn pointer fs-2'}`}
            onPress={handleClick}
            style={style}
            aria-label={'' + loadingId}
            {...props}
        >
            {
                LOADING[loadingId] && <span className='absolute custom-spin' style={{ marginTop: '1px' }}>
                    <Icon icon='loader-circle' size={size || 20} />
                </span>
            }
            <p className={`m-0 ${LOADING[loadingId] ? 'opacity-0' : ''}`}>
                {children || 'Button'}
            </p>
        </Button >
    )
}