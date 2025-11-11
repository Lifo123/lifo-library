'use client'
import React from 'react';
import { Button, ButtonProps } from 'react-aria-components';
import { Icon } from 'public-icons';

// Definimos las props que necesita nuestro botón de carga
interface LoadingButtonProps extends ButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
    size?: number;
}

export function LoadingButton({
    isLoading,
    children,
    size = 20,
    className,
    ...props
}: LoadingButtonProps) {
    // Deshabilitamos el botón si está cargando
    const isDisabled = props.isDisabled || isLoading;

    return (
        <Button
            className={`loading-btn ${className || 'style'}`}
            {...props}
            isDisabled={isDisabled} 
        >

            <span className={`${isLoading ? 'style' : ''}`} style={{ marginTop: '1px' }}>
                <Icon icon='loader-circle' size={size} strokeWidth={2.5} />
            </span>
            
            {/* Texto del Botón */}
            <p className={`${isLoading ? 'style' : ''}`}>
                {children}
            </p>
        </Button>
    );
}
