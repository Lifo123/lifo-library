"use client";
import React from "react";
import { useEnterAnimation } from "@react-aria/utils";
import { Dialog, Modal, ModalOverlay } from "react-aria-components/Modal";
import { InnerProps, BaseOverlayProps } from "../types";
import { OverlayController } from "../OverlayController";
import { dialog } from "../overlays.store";

export default function Sheet({
  id,
  children,
  modalOverlay,
  ...props
}: BaseOverlayProps) {
  const { isOpen, onOpenChange, ...restOverlay } = modalOverlay || {};

  return (
    <OverlayController
      id={id}
      handler={dialog}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {({ isExiting, overlayRef, handleOpenChange }) => (
        <DialogInner
          ref={overlayRef}
          isExiting={isExiting}
          dialogProps={{ ...props, id }}
          overlayProps={{ ...restOverlay, onOpenChange: handleOpenChange }}
        >
          {children}
        </DialogInner>
      )}
    </OverlayController>
  );
}

const DialogInner = React.forwardRef<HTMLDivElement, InnerProps>(
  ({ isExiting, overlayProps, dialogProps, children }, ref) => {
    const isEntering =
      useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;

    return (
      <ModalOverlay
        {...overlayProps}
        isDismissable={overlayProps.isDismissable}
        className="dialog-overlay"
        isOpen={true}
        ref={ref}
        data-is-entering={isEntering ? "" : undefined}
        data-is-exiting={isExiting ? "" : undefined}
      >
        <Modal
          className="dialog-modal"
          data-is-entering={isEntering ? "" : undefined}
          data-is-exiting={isExiting ? "" : undefined}
        >
          <Dialog
            {...dialogProps}
            className={`${dialogProps.className || ""} dialog-container`}
          >
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    );
  },
);
