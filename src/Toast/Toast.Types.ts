import type React from "react";

export type ToastTypes = "success" | "error" | "warning" | "info";
export type PositionTypes = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type AnimationType = "slide" | "fade" | "normal" | "none";

interface BaseToastProps {
  type?: ToastTypes;
  toastID?: string;
  title?: string;
  duration?: number;
  position?: PositionTypes;
  icon?: ToastTypes;
  customIcon?: React.ReactNode;
  link?: string;
  closeBtn?: boolean;
  state?: boolean,
  animate?: AnimationType;
  children?: React.ReactNode;
  loading?: string;
  success?: string;
  error?: string;
}

interface ActionableToastProps {
  action?: () => void;
  actionText?: string;
}

export interface toastPropTypes extends BaseToastProps, ActionableToastProps {
  delay?: number;
  className?: string;
  message?: string;
  style?: React.CSSProperties;
}

export interface SetProps extends BaseToastProps, ActionableToastProps {
  id?: number;
  message?: string;
  className?: string;
  style?: React.CSSProperties
}

export interface Toastprops {
  [key: string]: SetProps[];
}

export interface ToasterProps extends BaseToastProps {
  id?: string;
  parent?: boolean;
  maxToasts?: number;
}

export interface functionTypes extends Partial<toastPropTypes> {
}
export interface ToastState {
  [key: string]: SetProps[];
}