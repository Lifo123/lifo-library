import { BaseOverlayProps, InnerProps } from "../types";

export type SnapPoint = number | string; // Ej: 300 (px), o "50%" (vh)

export type TestDrag = {
  id: string;
  hideIndicator?: boolean;
  threshold?: number;
  snapPoints?: SnapPoint[];
  defaultSnapPoint?: SnapPoint;
  onSnapPointChange?: (snap: SnapPoint) => void;
};

export type DrawerComponentProps = {
  placement?: "top" | "bottom";
} & BaseOverlayProps &
  TestDrag;

export type InnerDrawerProps = {
  placement?: "top" | "bottom";
} & InnerProps;
