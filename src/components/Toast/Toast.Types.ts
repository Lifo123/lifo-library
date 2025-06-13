'use client'
import type React from "react";
import type { AnimationTypes, BaseComponentProps, DirTypes, ThemeTypes, AnimationPropsTypes } from "../../Types/GeneralTypes.js";

export type ToastTypes = "success" | "error" | "warning" | "info" | "loading";
export type PositionTypes = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ScaleOffsetTypes = "left" | "center" | "right";


export interface ToastBasicProps {
  position?: PositionTypes;
  duration?: number;
  animation?: AnimationTypes;
  scaleOffset?: ScaleOffsetTypes;
  animate?: AnimationPropsTypes;
  theme?: ThemeTypes;
  richColors?: boolean;
}


export interface ToastProps {
  [key: string]: ToastItemProps[]
}

export interface ToastItemProps<T = any> extends ToastBasicProps {
  index?: number;
  id: number;
  type?: ToastTypes;
  toastID?: string;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  customIcon?: React.ReactNode;
  href?: string;
  closeBtn?: boolean;
  children?: React.ReactNode;
  theme?: ThemeTypes;
  loading?: string;
  success?: string | ((data: T) => string);
  error?: string | ((error: any) => string);
  state?: boolean,
  maxToasts?: number;
  action?: () => void;
  actionText?: string;
  customAction?: React.ReactNode;
  noDissapear?: boolean;
  settings?: ToasterProps;
}

export interface ToastPromiseProps<T = any> extends ToastBasicProps {
  toastID?: string;
  loading?: string;
  success?: string | ((data: any) => string);
  error?: string | ((error: any) => string);
}

export interface ToastCustomProps extends ToastBasicProps {
  toastID?: string;
  noDissapear?: boolean;
}

export interface ToastFunctionProps extends ToastBasicProps {
  title?: string;
  type?: ToastTypes;
  toastID?: string
  icon?: React.ReactNode;
  customIcon?: React.ReactNode;
  href?: string;
  closeBtn?: boolean;
  action?: () => void;
  actionText?: string;
  customAction?: React.ReactNode;
  noDissapear?: boolean;
  delay?: number;
}

export interface ToasterProps extends BaseComponentProps {
  toastID?: string;
  position?: PositionTypes;
  duration?: number;
  maxToasts?: number;
  animation?: AnimationTypes;
  dir?: DirTypes;
}

export interface ToasterItemProps extends ToastItemProps {
  toastID: string;
  id: number;
}

export interface ShowProps extends ToastFunctionProps { }
export interface CustomFunctionProps extends Omit<ToastFunctionProps, 'type'> {
  id?: number;
}