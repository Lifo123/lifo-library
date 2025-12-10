'use client';
import React from "react";
import { LayerAnimation } from "./index";

type AnimateLazyProps = {
  isOpen?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function LazyAnimate({
  isOpen = false,
  children,
  ...props
}: AnimateLazyProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !children) return null;

  return (
    <LayerAnimation
      isOpen={isOpen}
      {...props}
    >
      {children}
    </LayerAnimation>
  )
}
