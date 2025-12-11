"use client";
import { Button, ButtonProps } from "react-aria-components";
import type { LoadingButtonpProps } from "./types";

export function LoadingButton({
  isLoading = false,
  children,
  size = 18,
  strokeWidth = 2.75,
  className = "",
  ...props
}: LoadingButtonpProps<ButtonProps>) {
  const isDisabled = props.isDisabled || isLoading;

  return (
    <Button
      {...props}
      className={`promise-btn ${className}`}
      isDisabled={isDisabled}
      data-loading={isLoading}
    >
      <span>
        <svg
          className="custom-spin"
          height={size}
          width={size}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        >
          <path
            fill="none"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 12.3375 2.01672 12.6711 2.04938 13"
          />
        </svg>
      </span>

      <span>{children}</span>
    </Button>
  );
}
