"use client";
import React from "react";
import { useEnterAnimation } from "@react-aria/utils";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";
import { InnerProps } from "../types";
import { OverlayController } from "../OverlayController";
import { drawer } from "../controller.store";
import { DrawerComponentProps } from "./types";

export default function Drawer({
  id,
  children,
  modalOverlay,
  placement = "bottom",
  ...props
}: DrawerComponentProps) {
  const { isOpen, onOpenChange, ...restOverlay } = modalOverlay || {};

  return (
    <OverlayController
      id={id}
      handler={drawer}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {({ isExiting, overlayRef, handleOpenChange }) => (
        <DrawerInner
          ref={overlayRef}
          isExiting={isExiting}
          dialogProps={{ ...props, id }}
          placement={placement}
          overlayProps={{ ...restOverlay, onOpenChange: handleOpenChange }}
        >
          {children}
        </DrawerInner>
      )}
    </OverlayController>
  );
}

type DrawerInnerProps = InnerProps & {
  placement?: "top" | "bottom" | "left" | "right";
};

const DrawerInner = React.forwardRef<HTMLDivElement, DrawerInnerProps>(
  ({ isExiting, overlayProps, dialogProps, placement, children }, ref) => {
    const isEntering =
      useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;

    return (
      <ModalOverlay
        {...overlayProps}
        isDismissable={overlayProps.isDismissable || true}
        className="drawer-overlay"
        isOpen={true}
        ref={ref}
        data-is-entering={isEntering ? "" : undefined}
        data-is-exiting={isExiting ? "" : undefined}
      >
        <Modal
          className="drawer-modal"
          data-placement={placement}
          data-is-entering={isEntering ? "" : undefined}
          data-is-exiting={isExiting ? "" : undefined}
        >
          <Dialog
            {...dialogProps}
            className={`${dialogProps.className || ""} drawer-container`}
          >
            {children}
          </Dialog>
        </Modal>
      </ModalOverlay>
    );
  },
);
