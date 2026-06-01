"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { useExitAnimation } from "@react-aria/utils";
import { $overlays, drawer, sheet, dialog } from "./controller.store";

type OverlayControllerProps = {
  id: string;
  handler: typeof drawer | typeof sheet | typeof dialog;

  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: (props: {
    isExiting: boolean;
    overlayRef: React.RefObject<HTMLDivElement | null>;
    handleOpenChange: (newOpenState: boolean) => void;
  }) => React.ReactNode;
};

export function OverlayController({
  id,
  handler,
  isOpen,
  onOpenChange,
  children,
}: OverlayControllerProps) {
  if (!id) throw new Error("Id is required field");

  const RECORD = useStore($overlays, { keys: [id] });
  const isStoreOpen = RECORD[id] ?? false;
  const isActuallyOpen = isOpen !== undefined ? isOpen : isStoreOpen;

  const handleOpenChange = (newOpenState: boolean) => {
    if (onOpenChange) onOpenChange(newOpenState);
    if (isOpen === undefined) {
      if (newOpenState) handler.show(id);
      else handler.hide(id);
    }
  };

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const isExiting = useExitAnimation(overlayRef, isActuallyOpen);

  if (!isActuallyOpen && !isExiting) {
    return null;
  }

  return <>{children({ isExiting, overlayRef, handleOpenChange })}</>;
}
