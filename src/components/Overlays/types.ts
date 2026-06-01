import { DialogProps, ModalOverlayProps } from "react-aria-components";

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
