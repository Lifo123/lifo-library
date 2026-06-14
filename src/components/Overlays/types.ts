import type { DialogProps, ModalOverlayProps } from "react-aria-components/Modal";

export type BaseOverlayProps = {
  id: string;
  modalOverlay?: ModalOverlayProps;
} & DialogProps;

export type InnerProps = {
  isExiting: boolean;
  dialogProps: DialogProps;
  overlayProps: ModalOverlayProps;
  children: DialogProps["children"];
};
