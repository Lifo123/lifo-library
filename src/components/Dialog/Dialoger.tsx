"use client";
import React from "react";
import {
  Dialog as AriaDialog,
  Modal,
  ModalOverlay,
  DialogProps,
  ModalOverlayProps,
} from "react-aria-components";

import { useStore } from "@nanostores/react";
import { $dialog, dialog } from "./dialog.store";
import { useEnterAnimation, useExitAnimation } from "@react-aria/utils";

type Props = {
  id: string;
  modalOverlay?: ModalOverlayProps;
} & DialogProps;

export function Dialoger({ id, children, modalOverlay, ...props }: Props) {
  if (!id) throw new Error("Id is required field");

  const { isOpen, onOpenChange, ...restOverlay } = modalOverlay || {};
  const RECORD = useStore($dialog, { keys: [id] });
  const isStoreOpen = RECORD[id] ?? false;

  const isActuallyOpen = isOpen !== undefined ? isOpen : isStoreOpen;

  const handleOpenChange = (newOpenState: boolean) => {
    if (onOpenChange) onOpenChange(newOpenState);
    if (isOpen === undefined) {
      if (newOpenState) dialog.show(id);
      else dialog.hide(id);
    }
  };

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const isExiting = useExitAnimation(overlayRef, isActuallyOpen);

  if (!isActuallyOpen && !isExiting) {
    return null;
  }

  return (
    <DialogerInner
      ref={overlayRef}
      isExiting={isExiting}
      dialogProps={props}
      overlayProps={{ ...restOverlay, onOpenChange: handleOpenChange }}
    >
      {children}
    </DialogerInner>
  );
}

type InnerProps = {
  isExiting: boolean;
  dialogProps: DialogProps;
  overlayProps: ModalOverlayProps;
  children: DialogProps["children"];
};

const DialogerInner = React.forwardRef<HTMLDivElement, InnerProps>(
  ({ isExiting, dialogProps, overlayProps, children }, ref) => {
    const isEntering =
      useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;

    return (
      <ModalOverlay
        {...overlayProps}
        isOpen={true}
        ref={ref}
        data-is-entering={isEntering ? "" : undefined}
        data-is-exiting={isExiting ? "" : undefined}
      >
        <Modal
          data-is-entering={isEntering ? "" : undefined}
          data-is-exiting={isExiting ? "" : undefined}
        >
          <AriaDialog {...dialogProps}>{children}</AriaDialog>
        </Modal>
      </ModalOverlay>
    );
  },
);
