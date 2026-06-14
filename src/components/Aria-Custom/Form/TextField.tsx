"use client";

import {
  Input,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from "react-aria-components/TextField";
import { Label } from "react-aria-components/Label";
import { FieldError } from "react-aria-components/FieldError";
import { Description } from "./Form";

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  children,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props}>
      <Label>{label}</Label>
      <Input
        id={`rac-${props.id}` || undefined}
        className="react-aria-Input inset"
        placeholder={placeholder}
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
