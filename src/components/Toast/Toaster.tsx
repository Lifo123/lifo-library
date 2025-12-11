"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { OverlayContainer } from "react-aria";
import { useEnterAnimation, useExitAnimation } from "@react-aria/utils";
import { $toaster, toast } from "./Toaster.store";
import { uuid } from "@Utils/index";
import { Icon } from "public-icons";
import type { ToastAllProps, ToasterSettingProps } from "./types";

import { Button, ButtonPromise } from "../Buttons/index";
import { ToastIcons } from "./ToastAssets";

export function Toaster(props: ToasterSettingProps) {
  const {
    toasterId = "default",
    maxToasts = 6,
    placement = "bottom-right",
    duration = 3200,
    richColors = false,
    noDissapear = false,
  } = props;

  const [toasterGeneralId] = React.useState(uuid(6, "lifo:toaster:"));
  const TOASTER = useStore($toaster);

  const settings = React.useMemo(() => {
    const s: Partial<ToasterSettingProps> = {
      maxToasts,
      placement,
      duration,
      richColors,
      noDissapear,
    };

    (Object.keys(s) as (keyof typeof s)[]).forEach((key) => {
      if (s[key] === undefined) {
        delete s[key];
      }
    });

    return s;
  }, [maxToasts, placement, duration, richColors, noDissapear]);

  React.useEffect(() => {
    $toaster.setKey(`${toasterId}.settings`, settings);
  }, [toasterId, settings]);

  const toasts = TOASTER[toasterId]?.toasts;
  if (!toasts) return null;

  const availableToast = toasts.slice(-maxToasts);

  return (
    <OverlayContainer className="toast-overlay" id={toasterGeneralId}>
      {availableToast.map((toast, i: number) => (
        <ToastItem key={toast.id} {...toast} index={i} />
      ))}
    </OverlayContainer>
  );
}

function ToastItem(props: ToastAllProps & { index: number }) {
  const { id, toasterId, isHovered, isOpen, noDissapear, duration, index } =
    props;

  const ref = React.useRef<HTMLDivElement>(null);

  const isExiting = useExitAnimation(ref, isOpen as boolean);

  React.useEffect(() => {
    if (!id || noDissapear || isHovered) {
      return;
    }

    let timeout;
    timeout = setTimeout(() => {
      toast.dismiss(id, toasterId);
    }, duration);

    return () => clearTimeout(timeout);
  }, [id, isHovered, noDissapear, duration, toasterId]);

  React.useEffect(() => {
    if (!isOpen && !isExiting && id) {
      toast.remove(id, toasterId);
    }
  }, [isOpen, isExiting, id, toasterId]);

  if (!isOpen && !isExiting) {
    return null;
  }

  return (
    <ToastItemInner {...props} isExiting={isExiting} ref={ref} index={index} />
  );
}

const ToastItemInner = React.forwardRef<
  HTMLDivElement,
  ToastAllProps & { isExiting: boolean; index: number }
>((props, ref: any) => {
  const {
    index,
    id,
    toasterId,
    isHovered,
    isOpen,
    placement,
    isExiting,

    // Props de renderizado
    title,
    description,
    type = "none",
    customIcon,
    hasCloseButton,
    action,
    actionLabel,
    richColors,
    custom,
  } = props;

  const isEntering =
    useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;
  const [axisY, axisX] = placement?.split("-") as [string, string];

  return (
    <div
      ref={ref}
      data-open={isOpen}
      data-hovered={isHovered}
      data-entering={isEntering || undefined}
      data-exiting={isExiting || undefined}
      data-axis-y={axisY}
      data-axis-x={axisX}
      className="toast-wrapper"
      onMouseEnter={() =>
        toast.update(id as string, { isHovered: true }, toasterId)
      }
      onMouseLeave={() =>
        toast.update(id as string, { isHovered: false }, toasterId)
      }
      style={
        {
          "--y-end-position": `calc(${ref!.current?.offsetHeight + 16}px * ${index} + 1.5rem)`,
        } as React.CSSProperties
      }
    >
      {custom ?? (
        <>
          <div
            className="toast-item"
            data-toast-type={type}
            data-richcolors={richColors}
          >
            <div>
              {customIcon || ToastIcons[type] ? (
                <span className="mr-1">{customIcon || ToastIcons[type]}</span>
              ) : null}
              <div>
                {title && <p className="title">{title}</p>}
                {description && <p className="description">{description}</p>}
              </div>
            </div>
            <span>
              {action ? (
                <ButtonPromise
                  onPress={async () => {
                    await action();
                    toast.dismiss(id, toasterId);
                  }}
                >
                  {actionLabel || "Continue"}
                </ButtonPromise>
              ) : (
                hasCloseButton && (
                  <Button
                    className={"icon-btn"}
                    onPress={() => toast.dismiss(id, toasterId)}
                  >
                    <Icon icon="close" size={22} strokeWidth={2.35} />
                  </Button>
                )
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
});
