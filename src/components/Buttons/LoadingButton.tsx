'use client'
import React from 'react';
import { Button, ButtonProps } from 'react-aria-components';
import { Icon } from 'public-icons';

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

            <p className={`${isLoading ? 'style' : ''}`}>
                {children}
            </p>
        </Button>
    );
}
