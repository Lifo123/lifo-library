import type React from "react";
import type { AnimationTypes, BaseComponentProps, DirTypes, AnimationProps, ThemeTypes } from "../../Types/GeneralTypes.js";
import type { RelativeTypes } from "../FlifoPortal/FlifoPortal.Types.js";

export type ToastTypes = "success" | "error" | "warning" | "info" | "loading";
export type PositionTypes = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ScaleOffsetTypes = "left" | "center" | "right";


export interface ToastBasicProps {
  position?: PositionTypes;
  duration?: number;
  animate?: AnimationTypes;
  scaleOffset?: ScaleOffsetTypes;
  startAnim?: AnimationProps;
  endAnim?: AnimationProps;
  theme?: ThemeTypes;
}


export interface ToastProps {
  [key: string]: ToastItemProps[]
}

export interface ToastItemProps extends ToastBasicProps, RelativeTypes {
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
  success?: string;
  error?: string;
  state?: boolean,
  maxToasts?: number;
  action?: () => void;
  actionText?: string;
  customAction?: React.ReactNode;
  noDissapear?: boolean;
}

export interface ToastPromiseProps extends ToastBasicProps {
  toastID?: string;
  loading?: string;
  success?: string;
  error?: string;
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

export interface ToasterProps extends BaseComponentProps, RelativeTypes {
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