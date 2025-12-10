'use client';
import React from 'react';
import { useStore } from '@nanostores/react';
import { loading } from '@Components/index';
import type { ButtonProps, PressEvent } from 'react-aria-components';
import type { PromiseButtonProps } from './types';
import { LoadingButton } from './LoadingButton';

interface ButtonPromiseProps extends ButtonProps {
  loadingId?: string;
  action?: () => Promise<void>;
}

export function ButtonPromise({
  loadingId = 'global',
  children,
  successLabel,
  errorLabel,
  onError,
  onSuccess,
  ...props
}: PromiseButtonProps<ButtonPromiseProps>) {
  const LOADING = useStore(loading.store);
  const isLoading = LOADING?.[loadingId] || false;

  const [currentLabel, setCurrentLabel] = React.useState<React.ReactNode>(null);

  const handleClick = async (e: PressEvent) => {
    if (!props.action) return;

    try {
      if (props.loadingLabel) setCurrentLabel(props.loadingLabel);

      await loading.promise(props.action, loadingId);

      if (successLabel) setCurrentLabel(successLabel);
      onSuccess?.();

    } catch (error) {
      console.error(`Error executing action ${loadingId}:`, error);
      if (errorLabel) setCurrentLabel(errorLabel);
      onError?.();

    } finally {
      if (successLabel || errorLabel) {
        setTimeout(() => {
          setCurrentLabel(null);
        }, 2500);
      } else {
        setCurrentLabel(null);
      }
    }
  };

  return (
    <LoadingButton
      isLoading={isLoading}
      onPress={handleClick}
      {...props}
    >
      <>
        {currentLabel || children || props.label || 'Button'}
      </>
    </LoadingButton>
  );
}
