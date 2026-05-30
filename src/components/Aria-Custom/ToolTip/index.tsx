"use client";
import React from "react";
import { TooltipTriggerProps } from "react-aria";
import {
  TooltipTrigger,
  Tooltip as AriaTooltip,
  Focusable,
  TooltipProps,
} from "react-aria-components";

interface TooltipLibProps extends TooltipTriggerProps {
  children: React.ReactNode;
  label?: string;
  content?: React.ReactNode;
  tooltipProps?: TooltipProps;
}

export function Tooltip({
  children,
  content,
  label,
  tooltipProps,
  delay = 50,
  closeDelay = 60,
  ...triggerProps
}: TooltipLibProps) {
  return (
    <TooltipTrigger delay={delay} closeDelay={closeDelay} {...triggerProps}>
      <Focusable>
        {React.isValidElement(children) ? (
          React.cloneElement(children as any, {
            role: "button",
            tabIndex: 0,
          })
        ) : (
          <span role="button" tabIndex={0}>
            {children}
          </span>
        )}
      </Focusable>
      <AriaTooltip {...tooltipProps}>
        {content || label || "tooltip"}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
