"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { $sheet, sheet } from "./sheet.store";
import { Dialog, Modal, ModalOverlay } from "react-aria-components";

export type SheetProps = {
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;

  id: string;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";

  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  defaultOpen?: boolean;
  bgColor?: string;

  modalClassName?: string;
  modalStyle?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Sheet({
  isOpen,
  onOpenChange,

  id,
  children,
  placement = "bottom",
  isDismissable = true,
  isKeyboardDismissDisabled,
  defaultOpen,
  bgColor,

  modalClassName,
  modalStyle,
  ...props
}: SheetProps) {
  if (!id){
    throw new Error("Id is required field");
  };

  const RECORD = useStore($sheet, { deps: [id], keys: [id] });
  const sheetIsOpen = isOpen ?? RECORD[id] ?? false;

  const sheetRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!sheetIsOpen) return;

    setTimeout(() => {
      const el = sheetRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setSize({ width: rect.width, height: rect.height });
      }
    }, 0);
  }, [sheetIsOpen]);

  return (
    <ModalOverlay
      isOpen={sheetIsOpen}
      onOpenChange={() => {
        if (onOpenChange) {
          onOpenChange?.(false);
          return;
        }

        sheet.hide(id);
      }}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      defaultOpen={defaultOpen}
      className={"sheet-overlay"}
      style={{ backgroundColor: bgColor || "#0000003a" }}
    >
      <Modal
        className={"sheet-modal " + modalClassName}
        data-placement={placement}
        style={
          {
            ...modalStyle,
            "--item-height": size.height + "px",
            "--item-width": size.width + "px",
          } as React.CSSProperties
        }
      >
        <Dialog
          {...props}
          ref={sheetRef}
          id={id}
          role="dialog"
          aria-label="dialog-sheet"
          className={"lifo-sheet " + props.className}
          data-placement={placement}
        >
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
