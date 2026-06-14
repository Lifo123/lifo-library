"use client";

import React from "react";
import {
  CheckboxButton,
  CheckboxField,
  FieldError,
  type CheckboxFieldProps,
  type ValidationResult,
} from "react-aria-components/Checkbox";
import { Description, Label } from "./Form";

interface CheckboxProps extends CheckboxFieldProps {
  children?: React.ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Checkbox({
  children,
  description,
  errorMessage,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxField {...props}>
      <CheckboxButton>
        {({ isIndeterminate }) => (
          <>
            <div className="indicator">
              <svg
                viewBox="0 0 18 18"
                aria-hidden="true"
                key={isIndeterminate ? "indeterminate" : "check"}
              >
                {isIndeterminate ? (
                  <rect x={1} y={7.5} width={16} height={3} />
                ) : (
                  <polyline points="2 9 7 14 16 4" />
                )}
              </svg>
            </div>
            {children}
          </>
        )}
      </CheckboxButton>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </CheckboxField>
  );
}

import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
} from "react-aria-components/CheckboxGroup";

export interface CheckboxGroupProps extends Omit<
  AriaCheckboxGroupProps,
  "children"
> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  orientation?: "horizontal" | "vertical";
}

export function CheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  orientation = "vertical",
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...props} data-orientation={orientation}>
      {label && <Label>{label}</Label>}
      <div className="checkbox-items">{children}</div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}
