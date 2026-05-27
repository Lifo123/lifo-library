"use client";
import React from "react";
import { TooltipTriggerProps } from "react-aria";
import {
  TooltipTrigger,
  Tooltip as Too,
  Focusable,
  TooltipProps,
} from "react-aria-components";

interface TooltipLibProps extends TooltipTriggerProps {
  children?: React.ReactNode;
  custom?: React.ReactNode;
  label?: string;
  popover?: TooltipProps;
}

export function Tooltip({
  children,
  custom,
  label,

  popover,
  ...props
}: TooltipLibProps) {
  return (
    <TooltipTrigger
      {...props}
      delay={props.delay || 50}
      closeDelay={props.closeDelay || 60}
    >
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
      <Too {...popover}>{custom || label || "tooltip"}</Too>
    </TooltipTrigger>
  );
}
