'use client';
import { useStore } from '@nanostores/react';
import { $loading, Loading } from '../Loading/Loading.Store.js';
import { ButtonProps } from 'react-aria-components';
import { LoadingButton } from './LoadingButton.js'; // 👈 Importamos el nuevo botón

interface ButtonPromiseProps extends Omit<ButtonProps, 'onPress'> {
    loadingId?: string;
    children?: React.ReactNode;
    onPress?: () => Promise<void>;
    size?: number;
}

export default function ButtonPromise({
    loadingId = 'G_Fetch', 
    children, 
    onPress, 
    ...props
}: ButtonPromiseProps) {
    
    const LOADING = useStore($loading);
    const isLoading = !!LOADING[loadingId];

    const handleClick = async () => {
        if (onPress) {
            try {
                await Loading.promise(onPress, loadingId);
            } catch (error) {
                console.error(`Error when executing the ${loadingId} action:`, error);
            }
        }
    };

    return (
        <LoadingButton
            isLoading={isLoading}
            onPress={handleClick}
            {...props}
        >
            {children || 'Button'}
        </LoadingButton>
    );
}