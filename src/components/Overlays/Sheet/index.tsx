"use client";
import React from "react";
import { useEnterAnimation } from "@react-aria/utils";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { InnerProps, BaseOverlayProps } from "../types";
import { OverlayController } from "../OverlayController";
import { sheet } from "../controller.store";

type SheetComponentProps = {
  placement?: "top" | "bottom" | "left" | "right";
} & BaseOverlayProps;

export default function Sheet({
  id,
  children,
  modalOverlay,
  placement = "bottom",
  ...props
}: SheetComponentProps) {
  const { isOpen, onOpenChange, ...restOverlay } = modalOverlay || {};

  return (
    <OverlayController
      id={id}
      handler={sheet}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {({ isExiting, overlayRef, handleOpenChange }) => (
        <SheetInner
          ref={overlayRef}
          isExiting={isExiting}
          dialogProps={{ ...props, id }}
          placement={placement}
          overlayProps={{ ...restOverlay, onOpenChange: handleOpenChange }}
        >
          {children}
        </SheetInner>
      )}
    </OverlayController>
  );
}

type SheetInnerProps = InnerProps & {
  placement?: "top" | "bottom" | "left" | "right";
};

const SheetInner = React.forwardRef<HTMLDivElement, SheetInnerProps>(
  ({ isExiting, overlayProps, dialogProps, placement, children }, ref) => {
    const isEntering =
      useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;

    return (
      <ModalOverlay
        {...overlayProps}
        isDismissable={overlayProps.isDismissable || true}
        className="sheet-overlay"
        isOpen={true}
        ref={ref}
        data-is-entering={isEntering ? "" : undefined}
        data-is-exiting={isExiting ? "" : undefined}
      >
        <Modal
          className="sheet-modal"
          data-placement={placement}
          data-is-entering={isEntering ? "" : undefined}
          data-is-exiting={isExiting ? "" : undefined}
        >
          <Dialog
            {...dialogProps}
            className={`${dialogProps.className || ""} sheet-container`}
          >
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    );
  },
);
