"use client";
import React from "react";
import { FocusableOptions, TooltipTriggerProps } from "react-aria";
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

  tooltipProps?: Omit<TooltipProps, "children" | "offset" | "crossOffset">;
  offset?: number;
  crossOffset?: number;

  focusableProps?: Omit<
    FocusableOptions,
    "isDisabled" | "autoFocus" | "excludeFromTabOrder"
  >;
  isDisabled?: boolean;
  autoFocus?: boolean;
  excludeFromTabOrder?: boolean;
}

export function Tooltip({
  children,
  custom,
  label,

  tooltipProps,
  offset,
  crossOffset,

  focusableProps,
  isDisabled,
  autoFocus,
  excludeFromTabOrder,
  ...props
}: TooltipLibProps) {
  return (
    <TooltipTrigger
      {...props}
      delay={props.delay || 50}
      closeDelay={props.closeDelay || 50}
    >
      <Focusable
        isDisabled={isDisabled}
        autoFocus={autoFocus}
        excludeFromTabOrder={excludeFromTabOrder}
        {...focusableProps}
      >
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
      <Too
        offset={offset || 4}
        crossOffset={crossOffset || 4}
        {...tooltipProps}
      >
        {custom || label || "tooltip"}
      </Too>
    </TooltipTrigger>
  );
}
